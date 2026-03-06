"use client";

import { useState, useEffect, useRef, useCallback, useMemo, Fragment } from "react";
import { createClient } from "@/lib/supabase/client";
import "./messages.css";

/* ═══════════════════════════════════════════════════
   Inline SVG Icons
   ═══════════════════════════════════════════════════ */
const icons = {
    plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>,
    send: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m22 2-7 20-4-9-9-4z" /><path d="m22 2-11 11" /></svg>,
    search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
    x: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
    msg: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>,
    users: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    user: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    pin: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" x2="12" y1="17" y2="22" /><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24z" /></svg>,
    paperclip: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>,
    smile: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></svg>,
    phone: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    info: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>,
    chevrDown: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>,
};

/* ═══════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════ */
interface Contact {
    id: string;
    full_name: string;
    role: string;
    avatar_url?: string;
}

interface ClassGroup {
    id: string;
    name: string;
    subject: string;
    memberCount: number;
}

interface MessageItem {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    created_at: string;
    is_read: boolean;
    attachment_url?: string;
    sender_name?: string;
}

type ChatTarget = { type: "dm"; contact: Contact } | { type: "group"; group: ClassGroup };

const QUICK_REPLIES = ["Thank you! 🙏", "Got it! 👍", "I'll work on it", "When is the deadline?", "Could you review this?", "Sounds good!"];
const EMOJI_REACTIONS = ["👍", "❤️", "😊", "🎉", "🤔", "👏"];

/* ═══════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════ */
interface MessagesClientProps {
    userId: string;
    contacts: Contact[];
    classGroups: ClassGroup[];
    allUsers: Contact[];
}

export default function MessagesClient({ userId, contacts: initialContacts, classGroups, allUsers }: MessagesClientProps) {
    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [activeChat, setActiveChat] = useState<ChatTarget | null>(null);
    const [messages, setMessages] = useState<MessageItem[]>([]);
    const [groupMessages, setGroupMessages] = useState<MessageItem[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [search, setSearch] = useState("");
    const [tab, setTab] = useState<"direct" | "groups">("direct");
    const [showNewMsg, setShowNewMsg] = useState(false);
    const [searchModal, setSearchModal] = useState("");
    const [reactions, setReactions] = useState<Record<string, Record<string, string[]>>>({});
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
    const [pinnedMessages, setPinnedMessages] = useState<Set<string>>(new Set());
    const [msgSearch, setMsgSearch] = useState("");
    const [showMsgSearch, setShowMsgSearch] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const supabase = createClient();

    const playNotificationSound = useCallback(() => {
        if (typeof window === "undefined") return;
        try {
            const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 880;
            osc.type = "sine";
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.3);
            setTimeout(() => void ctx.close(), 350);
        } catch {
            // noop: audio notifications are best-effort.
        }
    }, []);

    /* ─── Fetch unread counts on mount ─── */
    useEffect(() => {
        async function fetchUnread() {
            const { data } = await supabase
                .from("messages")
                .select("sender_id")
                .eq("receiver_id", userId)
                .eq("is_read", false);
            if (data) {
                const counts: Record<string, number> = {};
                data.forEach(m => { counts[m.sender_id] = (counts[m.sender_id] || 0) + 1; });
                setUnreadCounts(counts);
            }
        }
        fetchUnread();
    }, [userId, supabase]);

    /* ─── Online presence ─── */
    useEffect(() => {
        const channel = supabase.channel("online-users", {
            config: { presence: { key: userId } }
        });

        channel.on("presence", { event: "sync" }, () => {
            const state = channel.presenceState();
            setOnlineUsers(new Set(Object.keys(state)));
        });

        channel.subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                await channel.track({ user_id: userId, online_at: new Date().toISOString() });
            }
        });

        return () => { supabase.removeChannel(channel); };
    }, [userId, supabase]);

    /* ─── Global listener for new incoming DMs ─── */
    useEffect(() => {
        const channel = supabase
            .channel(`global-dms-${userId}`)
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "messages",
                filter: `receiver_id=eq.${userId}`,
            }, (payload) => {
                const msg = payload.new as MessageItem;

                setUnreadCounts(prev => {
                    // Don't bump unread if we are currently looking at their chat
                    if (activeChat?.type === "dm" && activeChat.contact.id === msg.sender_id) return prev;
                    return { ...prev, [msg.sender_id]: (prev[msg.sender_id] || 0) + 1 };
                });

                setContacts(prev => {
                    if (!prev.some(c => c.id === msg.sender_id)) {
                        const sender = allUsers.find(u => u.id === msg.sender_id);
                        if (sender) return [...prev, sender];
                    }
                    return prev;
                });
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [userId, supabase, allUsers, activeChat]);

    /* ─── Fetch DM messages ─── */
    useEffect(() => {
        if (!activeChat || activeChat.type !== "dm") return;
        const contactId = activeChat.contact.id;

        async function fetchMessages() {
            const { data } = await supabase
                .from("messages")
                .select("*")
                .or(`and(sender_id.eq.${userId},receiver_id.eq.${contactId}),and(sender_id.eq.${contactId},receiver_id.eq.${userId})`)
                .order("created_at", { ascending: true });
            setMessages(data || []);

            await supabase
                .from("messages")
                .update({ is_read: true })
                .eq("sender_id", contactId)
                .eq("receiver_id", userId);

            setUnreadCounts(prev => ({ ...prev, [contactId]: 0 }));
        }
        fetchMessages();

        const channel = supabase
            .channel(`dm-${contactId}`)
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "messages",
                filter: `receiver_id=eq.${userId}`,
            }, (payload) => {
                const msg = payload.new as MessageItem;
                if (msg.sender_id === contactId) {
                    setMessages(prev => [...prev, msg]);
                    playNotificationSound();
                }
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [activeChat, userId, supabase, playNotificationSound]);

    /* ─── Group chat via Supabase Broadcast ─── */
    useEffect(() => {
        if (!activeChat || activeChat.type !== "group") return;
        const groupId = activeChat.group.id;

        // Fetch persisted group messages
        async function fetchGroupMessages() {
            const { data, error } = await supabase
                .from("messages")
                .select("*, sender:profiles!sender_id(full_name)")
                .eq("receiver_id", groupId)
                .order("created_at", { ascending: true });

            if (error) {
                console.error("Failed to fetch group messages:", error);
            }

            // Map the joined profile name into sender_name for rendering
            const mappedData = (data || []).map((msg: MessageItem & { sender?: { full_name: string } }) => ({
                ...msg,
                sender_name: msg.sender_id === userId ? "You" : (msg.sender?.full_name || "Unknown"),
            }));

            setGroupMessages(mappedData);
        }
        fetchGroupMessages();

        const channel = supabase
            .channel(`group-${groupId}`)
            .on("broadcast", { event: "group-message" }, (payload) => {
                const msg = payload.payload as MessageItem;
                if (msg.sender_id !== userId) {
                    setGroupMessages(prev => [...prev, msg]);
                    playNotificationSound();
                }
            })
            .on("broadcast", { event: "typing" }, (payload) => {
                const name = payload.payload?.name as string;
                if (name) {
                    setTypingUsers(prev => prev.includes(name) ? prev : [...prev, name]);
                    setTimeout(() => setTypingUsers(prev => prev.filter(n => n !== name)), 3000);
                }
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [activeChat, userId, supabase, playNotificationSound]);

    /* ─── Typing indicator for DMs ─── */
    useEffect(() => {
        if (!activeChat || activeChat.type !== "dm") return;
        const contactId = activeChat.contact.id;

        const channel = supabase
            .channel(`typing-${contactId}-${userId}`)
            .on("broadcast", { event: "typing" }, () => {
                setTypingUsers([activeChat.contact.full_name]);
                setTimeout(() => setTypingUsers([]), 3000);
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [activeChat, userId, supabase]);

    const sendTypingIndicator = useCallback(() => {
        if (!activeChat) return;
        if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

        const channelName = activeChat.type === "dm"
            ? `typing-${userId}-${activeChat.contact.id}`
            : `group-${activeChat.group.id}`;

        supabase.channel(channelName).send({
            type: "broadcast",
            event: "typing",
            payload: { name: "You" },
        });

        typingTimerRef.current = setTimeout(() => { }, 3000);
    }, [activeChat, userId, supabase]);

    /* ─── Scroll to bottom ─── */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, groupMessages]);

    /* ─── Send message ─── */
    async function handleSend(e: React.FormEvent) {
        e.preventDefault();
        if (!newMessage.trim() || !activeChat) return;
        setSending(true);

        try {
            if (activeChat.type === "dm") {
                const { data, error } = await supabase
                    .from("messages")
                    .insert({
                        sender_id: userId,
                        receiver_id: activeChat.contact.id,
                        content: newMessage.trim(),
                    })
                    .select().single();

                if (error) throw error;
                if (data) setMessages(prev => [...prev, data]);
            } else {
                // Group message: store in DB + broadcast
                const { data, error } = await supabase
                    .from("messages")
                    .insert({
                        sender_id: userId,
                        receiver_id: activeChat.group.id,
                        content: newMessage.trim(),
                    })
                    .select().single();

                if (error) throw error;

                if (data) {
                    // Try to find the user's real name to broadcast to others
                    let myName = "Unknown";

                    // We might be in the contacts or allUsers list
                    const meInContacts = contacts.find(c => c.id === userId);
                    const meInAllUsers = allUsers.find(c => c.id === userId);

                    if (meInContacts) myName = meInContacts.full_name;
                    else if (meInAllUsers) myName = meInAllUsers.full_name;

                    const msgWithName = { ...data, sender_name: myName };

                    // For local display, we can override with "You" visually in render, 
                    // but we must broadcast our real name to everyone else
                    setGroupMessages(prev => [...prev, { ...data, sender_name: "You" }]);

                    supabase.channel(`group-${activeChat.group.id}`).send({
                        type: "broadcast",
                        event: "group-message",
                        payload: msgWithName,
                    });
                }
            }
        } catch (err: any) {
            console.error("Message send error:", err);
            alert(`Failed to send message: ${err.message || JSON.stringify(err)}`);
        } finally {
            setNewMessage("");
            setSending(false);
        }
    }

    function sendQuickReply(text: string) {
        setNewMessage(text);
    }

    function toggleReaction(msgId: string, emoji: string) {
        setReactions(prev => {
            const msgReactions = { ...(prev[msgId] || {}) };
            const users = msgReactions[emoji] || [];
            if (users.includes(userId)) {
                msgReactions[emoji] = users.filter(id => id !== userId);
                if (msgReactions[emoji].length === 0) delete msgReactions[emoji];
            } else {
                msgReactions[emoji] = [...users, userId];
            }
            return { ...prev, [msgId]: msgReactions };
        });
    }

    function togglePin(msgId: string) {
        setPinnedMessages(prev => {
            const s = new Set(prev);
            if (s.has(msgId)) s.delete(msgId); else s.add(msgId);
            return s;
        });
    }

    /* ─── Derived data ─── */
    const filteredContacts = useMemo(() => {
        return contacts.filter(c =>
            c.full_name.toLowerCase().includes(search.toLowerCase()) ||
            c.role.toLowerCase().includes(search.toLowerCase())
        );
    }, [contacts, search]);

    const filteredGroups = useMemo(() => {
        return classGroups.filter(g =>
            g.name.toLowerCase().includes(search.toLowerCase()) ||
            g.subject.toLowerCase().includes(search.toLowerCase())
        );
    }, [classGroups, search]);

    const activeMessages = activeChat?.type === "dm" ? messages : groupMessages;

    const filteredActiveMessages = useMemo(() => {
        if (!msgSearch) return activeMessages;
        return activeMessages.filter(m => m.content.toLowerCase().includes(msgSearch.toLowerCase()));
    }, [activeMessages, msgSearch]);

    const modalUsers = useMemo(() => {
        return allUsers.filter(u =>
            u.full_name.toLowerCase().includes(searchModal.toLowerCase()) ||
            u.role.toLowerCase().includes(searchModal.toLowerCase())
        );
    }, [allUsers, searchModal]);

    const totalUnread = Object.values(unreadCounts).reduce((a, b) => a + b, 0);

    /* ─── Time grouping helpers ─── */
    function getTimeGroup(dateStr: string): string {
        const d = new Date(dateStr);
        const now = new Date();
        if (d.toDateString() === now.toDateString()) return "Today";
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }

    function shouldShowTimeDivider(messages: MessageItem[], index: number): string | null {
        if (index === 0) return getTimeGroup(messages[0].created_at);
        const prev = getTimeGroup(messages[index - 1].created_at);
        const curr = getTimeGroup(messages[index].created_at);
        return prev !== curr ? curr : null;
    }

    function getContactName(id: string): string {
        const contact = contacts.find(c => c.id === id);
        return contact?.full_name || "Unknown";
    }

    return (
        <div className="msg-page">
            {/* Header */}
            <div className="msg-header">
                <h1>Messages</h1>
                <p>Chat with counselors, classmates, and class groups</p>
            </div>

            <div className="msg-container">
                {/* ─── Sidebar ─── */}
                <div className="msg-sidebar">
                    <div className="msg-sidebar-header">
                        <span className="msg-sidebar-title">
                            Chats {totalUnread > 0 && <span className="msg-tab-badge">{totalUnread}</span>}
                        </span>
                        <button className="msg-new-btn" onClick={() => setShowNewMsg(true)} title="New message">
                            {icons.plus()}
                        </button>
                    </div>

                    {/* Search */}
                    <div className="msg-search">
                        <div className="msg-search-wrap">
                            {icons.search()}
                            <input
                                className="msg-search-input"
                                placeholder="Search conversations..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="msg-tabs">
                        <button className={`msg-tab ${tab === "direct" ? "msg-tab--active" : ""}`} onClick={() => setTab("direct")}>
                            {icons.user()} Direct
                            {totalUnread > 0 && <span className="msg-tab-badge">{totalUnread}</span>}
                        </button>
                        <button className={`msg-tab ${tab === "groups" ? "msg-tab--active" : ""}`} onClick={() => setTab("groups")}>
                            {icons.users()} Groups
                            {filteredGroups.length > 0 && <span className="msg-tab-badge">{filteredGroups.length}</span>}
                        </button>
                    </div>

                    {/* Contact/Group list */}
                    <div className="msg-contact-list">
                        {tab === "direct" ? (
                            <>
                                {/* Counselors section */}
                                {filteredContacts.filter(c => c.role === "counselor" || c.role === "admin").length > 0 && (
                                    <>
                                        <div className="msg-section-label">Counselors & Staff</div>
                                        {filteredContacts
                                            .filter(c => c.role === "counselor" || c.role === "admin")
                                            .map(contact => (
                                                <div
                                                    key={contact.id}
                                                    className={`msg-contact ${activeChat?.type === "dm" && activeChat.contact.id === contact.id ? "msg-contact--active" : ""}`}
                                                    onClick={() => setActiveChat({ type: "dm", contact })}
                                                >
                                                    <div className="msg-contact-avatar msg-contact-avatar--counselor">
                                                        {contact.full_name.charAt(0).toUpperCase()}
                                                        <div className={`msg-avatar-status ${onlineUsers.has(contact.id) ? "msg-avatar-status--online" : "msg-avatar-status--offline"}`} />
                                                    </div>
                                                    <div className="msg-contact-info">
                                                        <div className="msg-contact-name">{contact.full_name}</div>
                                                        <div className="msg-contact-preview">{contact.role}</div>
                                                    </div>
                                                    <div className="msg-contact-meta">
                                                        {unreadCounts[contact.id] > 0 && (
                                                            <div className="msg-unread-badge">{unreadCounts[contact.id]}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </>
                                )}

                                {/* Students section */}
                                {filteredContacts.filter(c => c.role === "alumni").length > 0 && (
                                    <>
                                        <div className="msg-section-label">Students</div>
                                        {filteredContacts
                                            .filter(c => c.role === "alumni")
                                            .map(contact => (
                                                <div
                                                    key={contact.id}
                                                    className={`msg-contact ${activeChat?.type === "dm" && activeChat.contact.id === contact.id ? "msg-contact--active" : ""}`}
                                                    onClick={() => setActiveChat({ type: "dm", contact })}
                                                >
                                                    <div className="msg-contact-avatar msg-contact-avatar--dm">
                                                        {contact.full_name.charAt(0).toUpperCase()}
                                                        <div className={`msg-avatar-status ${onlineUsers.has(contact.id) ? "msg-avatar-status--online" : "msg-avatar-status--offline"}`} />
                                                    </div>
                                                    <div className="msg-contact-info">
                                                        <div className="msg-contact-name">{contact.full_name}</div>
                                                        <div className="msg-contact-preview">Student</div>
                                                    </div>
                                                    <div className="msg-contact-meta">
                                                        {unreadCounts[contact.id] > 0 && (
                                                            <div className="msg-unread-badge">{unreadCounts[contact.id]}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </>
                                )}

                                {filteredContacts.length === 0 && (
                                    <div className="msg-empty-inline">
                                        <div className="msg-empty-text">No contacts found</div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {filteredGroups.length > 0 ? (
                                    <>
                                        <div className="msg-section-label">Class Groups</div>
                                        {filteredGroups.map(group => (
                                            <div
                                                key={group.id}
                                                className={`msg-contact ${activeChat?.type === "group" && activeChat.group.id === group.id ? "msg-contact--active" : ""}`}
                                                onClick={() => {
                                                    setGroupMessages([]);
                                                    setActiveChat({ type: "group", group });
                                                }}
                                            >
                                                <div className="msg-contact-avatar msg-contact-avatar--group">
                                                    {icons.users()}
                                                </div>
                                                <div className="msg-contact-info">
                                                    <div className="msg-contact-name">{group.name}</div>
                                                    <div className="msg-contact-preview">{group.subject}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="msg-empty-inline">
                                        <div className="msg-empty-text">No class groups yet</div>
                                        <div className="msg-empty-subtext">Enroll in a class to see group chats</div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* ─── Chat Area ─── */}
                <div className="msg-chat">
                    {activeChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="msg-chat-header">
                                <div className={`msg-chat-header-avatar ${activeChat.type === "group" ? "msg-contact-avatar--group" : activeChat.contact.role === "counselor" || activeChat.contact.role === "admin" ? "msg-contact-avatar--counselor" : "msg-contact-avatar--dm"}`}>
                                    {activeChat.type === "dm"
                                        ? activeChat.contact.full_name.charAt(0).toUpperCase()
                                        : icons.users()}
                                </div>
                                <div className="msg-chat-header-info">
                                    <div className="msg-chat-header-name">
                                        {activeChat.type === "dm" ? activeChat.contact.full_name : activeChat.group.name}
                                    </div>
                                    <div className={`msg-chat-header-status ${activeChat.type === "dm" && onlineUsers.has(activeChat.contact.id) ? "msg-chat-header-status--online" : ""}`}>
                                        {activeChat.type === "dm"
                                            ? (onlineUsers.has(activeChat.contact.id) ? "Online now" : "Offline")
                                            : activeChat.group.subject}
                                    </div>
                                </div>
                                <div className="msg-chat-actions">
                                    <button
                                        className="msg-chat-action-btn"
                                        onClick={() => setShowMsgSearch(!showMsgSearch)}
                                        title="Search messages"
                                    >
                                        {icons.search()}
                                    </button>
                                    <button className="msg-chat-action-btn" title="Info">
                                        {icons.info()}
                                    </button>
                                </div>
                            </div>

                            {/* Search within messages */}
                            {showMsgSearch && (
                                <div className="msg-search msg-search-inline">
                                    <div className="msg-search-wrap">
                                        {icons.search()}
                                        <input
                                            className="msg-search-input"
                                            placeholder="Search in this conversation..."
                                            value={msgSearch}
                                            onChange={e => setMsgSearch(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Pinned messages */}
                            {filteredActiveMessages.filter(m => pinnedMessages.has(m.id)).length > 0 && (
                                <div className="msg-pinned-area">
                                    {filteredActiveMessages.filter(m => pinnedMessages.has(m.id)).map(m => (
                                        <div key={m.id} className="msg-pinned-item" title={m.content}>
                                            {icons.pin()}
                                            <span className="msg-pinned-text">{m.content}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Messages */}
                            <div className="msg-messages">
                                {filteredActiveMessages.map((msg, idx) => {
                                    const isMine = msg.sender_id === userId || msg.sender_name === "You";
                                    const timeDivider = shouldShowTimeDivider(filteredActiveMessages, idx);
                                    const msgReactions = reactions[msg.id] || {};
                                    const isGroup = activeChat.type === "group";

                                    return (
                                        <Fragment key={msg.id}>
                                            {timeDivider && (
                                                <div className="msg-time-divider">
                                                    <div className="msg-time-divider-line" />
                                                    <span className="msg-time-divider-text">{timeDivider}</span>
                                                    <div className="msg-time-divider-line" />
                                                </div>
                                            )}
                                            <div
                                                className={`msg-bubble-wrap ${isMine ? "msg-bubble-wrap--mine" : isGroup ? "msg-bubble-wrap--group-theirs" : "msg-bubble-wrap--theirs"}`}
                                                style={isMine ? { marginLeft: 'auto', alignSelf: 'flex-end' } : {}}
                                            >
                                                {isGroup && !isMine && (
                                                    <div className="msg-bubble-group-avatar">
                                                        {(msg.sender_name || getContactName(msg.sender_id)).charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <div className={`msg-bubble ${isMine ? "msg-bubble--mine" : "msg-bubble--theirs"}`}>
                                                    {isGroup && !isMine && (
                                                        <div className="msg-bubble-sender">{msg.sender_name || getContactName(msg.sender_id)}</div>
                                                    )}
                                                    <p>{msg.content}</p>
                                                    <div className="msg-bubble-time">
                                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                        {pinnedMessages.has(msg.id) && " 📌"}
                                                    </div>

                                                    {/* Reaction picker */}
                                                    <div className="msg-reaction-picker">
                                                        {EMOJI_REACTIONS.map(emoji => (
                                                            <button key={emoji} onClick={() => toggleReaction(msg.id, emoji)}>{emoji}</button>
                                                        ))}
                                                        <button onClick={() => togglePin(msg.id)} title="Pin">{icons.pin()}</button>
                                                    </div>
                                                </div>
                                                {/* Show reactions */}
                                                {Object.keys(msgReactions).length > 0 && (
                                                    <div className="msg-reactions">
                                                        {Object.entries(msgReactions).map(([emoji, users]) => (
                                                            <span
                                                                key={emoji}
                                                                className={`msg-reaction ${users.includes(userId) ? "msg-reaction--active" : ""}`}
                                                                onClick={() => toggleReaction(msg.id, emoji)}
                                                            >
                                                                <span className="msg-reaction-emoji">{emoji}</span>
                                                                <span className="msg-reaction-count">{users.length}</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </Fragment>
                                    );
                                })}

                                {/* Typing indicator */}
                                {typingUsers.length > 0 && (
                                    <div className="msg-typing">
                                        <div className="msg-typing-dots">
                                            <span /><span /><span />
                                        </div>
                                        {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Quick replies */}
                            <div className="msg-quick-replies">
                                {QUICK_REPLIES.map(reply => (
                                    <button key={reply} className="msg-quick-reply" onClick={() => sendQuickReply(reply)}>
                                        {reply}
                                    </button>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="msg-input-area">
                                <form className="msg-input-form" onSubmit={handleSend}>
                                    <button type="button" className="msg-input-btn msg-attach-btn" title="Attach file">
                                        {icons.paperclip()}
                                    </button>
                                    <input
                                        className="msg-input"
                                        placeholder={activeChat.type === "dm" ? `Message ${activeChat.contact.full_name}...` : `Message ${activeChat.group.name}...`}
                                        value={newMessage}
                                        onChange={e => {
                                            setNewMessage(e.target.value);
                                            sendTypingIndicator();
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        className="msg-input-btn msg-send-btn"
                                        disabled={!newMessage.trim() || sending}
                                    >
                                        {icons.send()}
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        /* ─── Empty State ─── */
                        <div className="msg-empty">
                            <div className="msg-empty-content">
                                <div className="msg-empty-icon">{icons.msg()}</div>
                                <h3>Start a Conversation</h3>
                                <p>Connect with your counselors, chat with classmates, or join a class group discussion.</p>
                                <button className="msg-empty-cta" onClick={() => setShowNewMsg(true)}>
                                    {icons.plus()} New Message
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── New Message Modal ─── */}
            {showNewMsg && (
                <div className="msg-modal-overlay" onClick={() => setShowNewMsg(false)}>
                    <div className="msg-modal" onClick={e => e.stopPropagation()}>
                        <div className="msg-modal-header">
                            <span className="msg-modal-title">New Message</span>
                            <button className="msg-modal-close" onClick={() => setShowNewMsg(false)}>
                                {icons.x()}
                            </button>
                        </div>
                        <div className="msg-modal-search">
                            <div className="msg-search-wrap">
                                {icons.search()}
                                <input
                                    className="msg-search-input"
                                    placeholder="Search by name or role..."
                                    value={searchModal}
                                    onChange={e => setSearchModal(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="msg-modal-list">
                            {modalUsers.map(user => (
                                <div
                                    key={user.id}
                                    className="msg-modal-user"
                                    onClick={() => {
                                        setActiveChat({ type: "dm", contact: user });
                                        setShowNewMsg(false);
                                        setSearchModal("");
                                        // Add to contacts if not already there
                                        setContacts(prev => {
                                            if (!prev.some(c => c.id === user.id)) {
                                                return [...prev, user];
                                            }
                                            return prev;
                                        });
                                    }}
                                >
                                    <div className="msg-modal-user-avatar">
                                        {user.full_name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="msg-modal-user-info">
                                        <div className="msg-modal-user-name">{user.full_name}</div>
                                        <div className="msg-modal-user-role">{user.role}</div>
                                    </div>
                                    <div className={`msg-avatar-status ${onlineUsers.has(user.id) ? "msg-avatar-status--online" : "msg-avatar-status--offline"} msg-avatar-static`} />
                                </div>
                            ))}
                            {modalUsers.length === 0 && (
                                <div className="msg-modal-empty">
                                    No users found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
