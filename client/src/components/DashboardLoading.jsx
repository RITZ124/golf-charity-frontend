// DashboardLoading.jsx

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#050816] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <Skeleton
          height={50}
          width={320}
          baseColor="#1e293b"
          highlightColor="#334155"
          borderRadius={16}
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton
              key={item}
              height={180}
              baseColor="#1e293b"
              highlightColor="#334155"
              borderRadius={28}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <Skeleton
            height={320}
            baseColor="#1e293b"
            highlightColor="#334155"
            borderRadius={28}
          />

          <Skeleton
            height={320}
            baseColor="#1e293b"
            highlightColor="#334155"
            borderRadius={28}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardLoading;