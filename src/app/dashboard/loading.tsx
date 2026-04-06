export default function DashboardLoading() {
  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-[rgba(255,255,255,0.1)] border-t-[#ff6b7a] rounded-full animate-spin"></div>
        <p className="text-[rgba(255,255,255,0.5)] font-medium text-sm tracking-wide">Loading...</p>
      </div>
    </div>
  );
}
