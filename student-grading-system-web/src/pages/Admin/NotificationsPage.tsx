import { useState } from "react";
import { useSendNotification } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function NotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("Info");

  const { mutate, isPending } = useSendNotification();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      title,
      message,
      userId: parseInt(userId, 10),
      type,
    }, {
      onSuccess: () => {
        setTitle("");
        setMessage("");
        setUserId("");
      }
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Send Notification</h1>
        <p className="text-slate-500">Send an alert or message to a specific user.</p>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Target User ID</label>
            <Input 
              type="number" 
              required 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. 1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notification Type</label>
            <select 
              className="w-full border rounded-md h-10 px-3 bg-white"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Info">Information</option>
              <option value="Warning">Warning</option>
              <option value="Alert">Alert</option>
              <option value="Success">Success</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input 
              required 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notification Title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea 
              required 
              value={message} 
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              placeholder="Write the message content here..."
              rows={4}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Sending..." : "Send Notification"}
          </Button>
        </form>
      </div>
    </div>
  );
}
