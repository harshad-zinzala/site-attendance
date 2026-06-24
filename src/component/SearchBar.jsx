import { Search } from 'lucide-react';

export default function SearchBar({
  searchText,
  setSearchText,
  onBulkClick
}) {
  return (
    <div className="p-4 pb-2 flex items-center gap-2">
      <div className="relative flex-1 min-w-0">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search workers..."
          className="w-full bg-[#ebeae4]/45 border border-slate-200/80 rounded-2xl py-3 pl-12 pr-4 text-sm placeholder-slate-400/90 focus:outline-none focus:border-slate-400 transition-all text-slate-800 font-medium"
        />
      </div>
    </div>
  );
}
