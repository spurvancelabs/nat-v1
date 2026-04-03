import { UserButton } from '@clerk/clerk-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useSocketStore } from '../lib/socket';
import { useSocketConnection } from '../hooks/useSocketConnection';
import {
  SparklesIcon,
  MessageSquareIcon,
  PlusIcon,
  ShieldIcon,
  LockIcon,
  SendIcon,
  SearchIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
} from 'lucide-react';

import { useChats, useGetOrCreateChat } from '../hooks/useChats';
import { useMessages } from '../hooks/useMessages';
import { ChatListItem } from '../components/ChatListItem';
import { ChatHeader } from '../components/ChatHeader';
import { MessageBubble } from '../components/MessageBubble';
import { ChatInput } from '../components/ChatInput';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { NewChatModal } from '../components/NewChatModal';

function ChatPage() {
  const { data: currentUser } = useCurrentUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeChatId = searchParams.get('chat');

  const [messageInput, setMessageInput] = useState('');
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const { socket, setTyping, sendMessage } = useSocketStore();

  useSocketConnection();

  const { data: chats = [], isLoading: chatsLoading } = useChats();
  const { data: messages = [], isLoading: messagesLoading } =
    useMessages(activeChatId);
  const startChatMutation = useGetOrCreateChat();

  // Filter chats based on search query
  const filteredChats = chats.filter((chat) => {
    if (!searchQuery.trim()) return true;
    const participantName = chat.participant?.username || '';
    return participantName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // scroll to bottom when chat or messages changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChatId, messages]);

  const handleStartChat = (participantId) => {
    startChatMutation.mutate(participantId, {
      onSuccess: (chat) => setSearchParams({ chat: chat._id }),
    });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChatId || !socket || !currentUser)
      return;

    const text = messageInput.trim();
    sendMessage(activeChatId, text, currentUser);
    setMessageInput('');
    setTyping(activeChatId, false);
  };

  const handleTyping = (e) => {
    setMessageInput(e.target.value);
    if (!activeChatId) return;

    setTyping(activeChatId, true);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(activeChatId, false);
    }, 2000);
  };

  const activeChat = chats.find((c) => c._id === activeChatId);

  return (
    <div className="h-screen bg-[#0F3220] text-white flex overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Sidebar */}
      <div className="w-80 border-r border-white/10 flex flex-col bg-[#0F3220] backdrop-blur-sm relative z-10">
        {/* HEADER */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <Link to="/chat" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <ShieldIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight">
                  SecureChat
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-300">Encrypted</span>
                </div>
              </div>
            </Link>
            <div className="relative">
              <UserButton />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-colors"
            />
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => setIsNewChatModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors active:scale-[0.98] shadow-lg shadow-emerald-500/20"
          >
            <PlusIcon className="w-4 h-4" />
            New Secure Chat
          </button>

          {/* Connection Status */}
          <div className="mt-3 flex items-center gap-2 text-xs text-white/50">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Secure Connection Active</span>
          </div>
        </div>

        {/* Chat list header */}
        <div className="px-4 py-2 border-b border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/70 uppercase tracking-wider">
              Conversations
            </span>
            <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg">
              <UsersIcon className="w-3 h-3" />
              <span className="text-xs">{chats.length}</span>
            </div>
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {chatsLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mb-3" />
              <p className="text-sm text-white/50">Loading secure chats...</p>
            </div>
          )}

          {filteredChats.length === 0 && !chatsLoading && (
            <NoConversationsUI searchQuery={searchQuery} />
          )}

          <div className="py-2">
            {filteredChats.map((chat) => (
              <div
                key={chat._id}
                className={`mx-2 mb-1 transition-all duration-200 ${
                  activeChatId === chat._id
                    ? 'bg-white/10 border border-white/20 rounded-xl shadow-lg'
                    : 'hover:bg-white/5 rounded-xl'
                }`}
              >
                <ChatListItem
                  chat={chat}
                  isActive={activeChatId === chat._id}
                  onClick={() => setSearchParams({ chat: chat._id })}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-white/40">
            <div className="flex items-center gap-1">
              <LockIcon className="w-3 h-3" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircleIcon className="w-3 h-3 text-emerald-400" />
              <span>No Backup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col relative z-10">
        {activeChatId && activeChat ? (
          <>
            <ChatHeader
              participant={activeChat.participant}
              chatId={activeChatId}
            />

            {/* Encryption banner */}
            <div className="px-6 pt-4">
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                <LockIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-300">
                  Messages are end-to-end encrypted • Chat started on{' '}
                  {new Date(activeChat.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messagesLoading && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-10 h-10 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mb-4" />
                  <p className="text-white/50">Decrypting messages...</p>
                </div>
              )}

              {messages.length === 0 && !messagesLoading && <NoMessagesUI />}

              {/* Welcome message */}
              {messages.length === 0 && !messagesLoading && (
                <div className="text-center max-w-md mx-auto py-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-4">
                    <ShieldIcon className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-emerald-300">
                      Secure Channel Established
                    </span>
                  </div>
                </div>
              )}

              {messages.length > 0 &&
                messages.map((msg) => (
                  <MessageBubble
                    key={msg._id}
                    message={msg}
                    currentUser={currentUser}
                  />
                ))}

              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Enhanced Chat Input */}
            <div className="border-t border-white/10 bg-[#0F3220] backdrop-blur-sm">
              <div className="p-4">
                <form onSubmit={handleSend} className="relative">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                      <textarea
                        value={messageInput}
                        onChange={handleTyping}
                        placeholder="Type a secure message..."
                        className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-200 resize-none min-h-[44px] max-h-32"
                        rows="1"
                      />
                      <div className="absolute right-3 bottom-3 flex items-center gap-2">
                        <div className="text-xs text-white/30">
                          {messageInput.length}/2000
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-white/10 disabled:cursor-not-allowed text-white rounded-2xl transition-colors active:scale-[0.98] disabled:active:scale-100"
                    >
                      <SendIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-white/40">
                    <div className="flex items-center gap-2">
                      <span>Messages are secured with 256-bit encryption</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      <span>Messages vanish after 24h</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <NoChatSelectedUI />
        )}
      </div>

      <NewChatModal
        onStartChat={handleStartChat}
        isPending={startChatMutation.isPending}
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
      />
    </div>
  );
}
export default ChatPage;

function NoConversationsUI({ searchQuery }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <MessageSquareIcon className="w-8 h-8 text-emerald-400/50" />
      </div>
      {searchQuery ? (
        <>
          <p className="text-white/70">No conversations found</p>
          <p className="text-white/50 text-sm mt-1">
            Try searching with different keywords
          </p>
        </>
      ) : (
        <>
          <p className="text-white/70">No conversations yet</p>
          <p className="text-white/50 text-sm mt-1">
            Start a new secure chat to begin
          </p>
        </>
      )}
    </div>
  );
}

function NoMessagesUI() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <LockIcon className="w-10 h-10 text-emerald-400" />
        </div>
        <div className="absolute -top-2 -right-2">
          <div className="w-8 h-8 rounded-full bg-[#0F3220] border border-emerald-500/30 flex items-center justify-center">
            <ShieldIcon className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Secure Channel Ready</h3>
      <p className="text-white/70 max-w-sm mb-6">
        Your conversation is protected with end-to-end encryption. Only you and
        the recipient can read these messages.
      </p>
      <div className="flex items-center gap-2 text-sm text-emerald-300">
        <CheckCircleIcon className="w-4 h-4" />
        <span>Messages are encrypted on your device</span>
      </div>
    </div>
  );
}

function NoChatSelectedUI() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl shadow-black/30">
            <div className="absolute inset-0 rounded-3xl border border-emerald-500/30 animate-ping" />
            <ShieldIcon className="w-12 h-12 text-emerald-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/40 flex items-center justify-center">
            <LockIcon className="w-5 h-5 text-emerald-300" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
          Secure Messaging
        </h2>

        <p className="text-white/80 max-w-md mb-8 text-lg">
          Select a conversation from the sidebar or start a new encrypted chat
          to begin secure messaging
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <LockIcon className="w-6 h-6 text-emerald-400 mb-2 mx-auto" />
            <div className="text-xs text-white/70">End-to-End Encryption</div>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <ShieldIcon className="w-6 h-6 text-emerald-400 mb-2 mx-auto" />
            <div className="text-xs text-white/70">No Message Storage</div>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <ClockIcon className="w-6 h-6 text-emerald-400 mb-2 mx-auto" />
            <div className="text-xs text-white/70">24h Auto-Delete</div>
          </div>
        </div>
      </div>
    </div>
  );
}
