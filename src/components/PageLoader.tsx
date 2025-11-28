export const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Minimal shimmer effect */}
      <div className="px-[29px] py-6">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <div className="h-[90px] w-[200px] bg-muted/30 rounded-lg" />
          <div className="flex gap-4">
            <div className="h-10 w-24 bg-muted/30 rounded-md" />
            <div className="h-10 w-24 bg-muted/30 rounded-md" />
            <div className="h-10 w-24 bg-muted/30 rounded-md" />
          </div>
        </div>
      </div>

      <div className="min-h-[45vh] flex items-center justify-center px-6">
        <div className="text-center max-w-[880px] mx-auto space-y-6">
          <div className="h-8 w-64 mx-auto bg-muted/30 rounded-full" />
          <div className="h-20 w-full bg-muted/30 rounded-lg" />
          <div className="h-6 w-3/4 mx-auto bg-muted/30 rounded-md" />
          <div className="h-12 w-40 mx-auto bg-muted/30 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
