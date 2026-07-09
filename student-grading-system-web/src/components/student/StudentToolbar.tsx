import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StudentToolbar() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">
        Manage All Students
      </h1>

      <div className="flex items-center gap-3">
        <Input
          placeholder="Search students..."
          className="w-72"
        />

        <Button>
          + Add Student
        </Button>
      </div>
    </div>
  );
}