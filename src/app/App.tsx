import { useState } from "react";
import { 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  XCircle, 
  UserCheck, 
  AlertCircle, 
  Calendar,
  Sparkles
} from "lucide-react";

// Attendance status types (Present / Absent)
type AttendanceStatus = "present" | "absent";

interface Student {
  id: number;
  name: string;
  studentId: string;
  program: string;
  status: AttendanceStatus;
  lastUpdated?: string;
  avatarBg: string;
}

interface AttendanceManagerProps {
  onBack: () => void;
}

// Apple-style subtle avatar background colors
const avatarColors = [
  "#e8f1fc", "#e6f5ec", "#fff4e0", "#ebebef", "#f3e8fd", "#ffecea"
];

// Dummy Student Data
const initialStudents: Student[] = [
  { id: 1, name: "Minjun Kim", studentId: "STU-2026-001", program: "Dynamic Afterschool", status: "present", avatarBg: avatarColors[0] },
  { id: 2, name: "Jiwon Lee", studentId: "STU-2026-002", program: "TKD", status: "present", avatarBg: avatarColors[1] },
  { id: 3, name: "Seojun Park", studentId: "STU-2026-003", program: "Dynamic Afterschool", status: "absent", avatarBg: avatarColors[2] },
  { id: 4, name: "Yujin Choi", studentId: "STU-2026-004", program: "Trial", status: "present", avatarBg: avatarColors[3] },
  { id: 5, name: "Haeun Jung", studentId: "STU-2026-005", program: "TKD", status: "present", avatarBg: avatarColors[4] },
  { id: 6, name: "Hyunwoo Kang", studentId: "STU-2026-006", program: "Dynamic Afterschool", status: "absent", avatarBg: avatarColors[5] },
  { id: 7, name: "Dohyun Yoon", studentId: "STU-2026-007", program: "Trial", status: "present", avatarBg: avatarColors[0] },
  { id: 8, name: "Sohee Han", studentId: "STU-2026-008", program: "TKD", status: "present", avatarBg: avatarColors[1] },
];

export default function AttendanceManager({ onBack }: AttendanceManagerProps) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | AttendanceStatus>("all");

  // Status Toggle Handler (Hook into Main OS here)
  const toggleStatus = (id: number, newStatus: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id === id) {
          const updated: Student = {
            ...student,
            status: newStatus,
            lastUpdated: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          };
          
          // Main OS sync integration point
          console.log(`[OS Sync] Student ID ${id} status changed to ${newStatus}`);
          
          return updated;
        }
        return student;
      })
    );
  };

  // Calculate statistics
  const totalCount = students.length;
  const presentCount = students.filter((s) => s.status === "present").length;
  const absentCount = students.filter((s) => s.status === "absent").length;

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || student.status === filter;
    return matchesSearch && matchesFilter;
  });

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
    >
      {/* Top Glass Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 border-b border-slate-200" style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-150"
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          >
          </button>
          
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            <Calendar size={13} className="text-blue-600" />
            <span>{todayDate}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Sparkles size={14} /> Attendance OS
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
            Student Attendance
          </h1>
          <p className="text-sm text-slate-500 font-normal">
            Click status toggles to update attendance in real-time.
          </p>
        </header>

        {/* Apple Style Summary Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between shadow-sm">
            <span className="text-xs font-medium text-slate-500">Total Students</span>
            <div className="flex items-baseline justify-between mt-3">
              <span className="text-2xl font-bold tracking-tight">{totalCount}</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <UserCheck size={15} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between shadow-sm">
            <span className="text-xs font-medium text-slate-500">Present</span>
            <div className="flex items-baseline justify-between mt-3">
              <span className="text-2xl font-bold tracking-tight text-emerald-600">{presentCount}</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={15} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between shadow-sm">
            <span className="text-xs font-medium text-slate-500">Absent</span>
            <div className="flex items-baseline justify-between mt-3">
              <span className="text-2xl font-bold tracking-tight text-rose-600">{absentCount}</span>
              <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                <XCircle size={15} />
              </div>
            </div>
          </div>
        </section>

        {/* Controls Bar: Search & Status Filters */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-150"
            />
          </div>

          {/* Filter Segmented Control (Apple Style) */}
          <div className="w-full sm:w-auto flex items-center bg-slate-200/60 p-1 rounded-xl border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg transition-all duration-150 ${
                filter === "all" ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("present")}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg transition-all duration-150 ${
                filter === "present" ? "bg-white text-emerald-600 shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Present
            </button>
            <button
              onClick={() => setFilter("absent")}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg transition-all duration-150 ${
                filter === "absent" ? "bg-white text-rose-600 shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Absent
            </button>
          </div>
        </section>

        {/* Student List */}
        <section className="space-y-2.5">
          {filteredStudents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              <AlertCircle size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No students found matching your criteria.</p>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-2xl border border-slate-200 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 hover:shadow-md"
              >
                {/* Student Info */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-slate-700 flex-shrink-0"
                    style={{ backgroundColor: student.avatarBg }}
                  >
                    {student.name.slice(0, 1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold tracking-tight text-slate-900">{student.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 font-mono">
                        {student.studentId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>{student.program}</span>
                      {student.lastUpdated && (
                        <>
                          <span>•</span>
                          <span>Updated: {student.lastUpdated}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Apple Segmented Toggle Button Group */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-end sm:self-auto">
                  <button
                    onClick={() => toggleStatus(student.id, "present")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 ${
                      student.status === "present"
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <CheckCircle2 size={13} />
                    Present
                  </button>

                  <button
                    onClick={() => toggleStatus(student.id, "absent")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 ${
                      student.status === "absent"
                        ? "bg-rose-500 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <XCircle size={13} />
                    Absent
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
