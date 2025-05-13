type Props = {
    documentSearch: string;
    setDocumentSearch: (value: string) => void;
    dateFilter: string;
    setDateFilter: (value: string) => void;
};

export default function CreditFilter({
    documentSearch,
    setDocumentSearch,
    dateFilter,
    setDateFilter
}: Props) {
    return (
        <div className="flex flex-col justify-end gap-4 md:flex-row w-full">
            <input
                type="text"
                placeholder="Buscar por número de documento"
                value={documentSearch}
                onChange={(e) => setDocumentSearch(e.target.value)}
                className="w-full p-2 bg-white border border-[#B6ABD3] placeholder:text-gray-600 rounded-lg"
            />
            <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-60 p-2 bg-white border border-[#B6ABD3] placeholder:text-gray-600 rounded-lg"
            />
        </div>
    );
}
