import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col gap-2 justify-center items-center py-10 text-gray-500">
            <p className=" text-lg animate-pulse">Cargando créditos...</p> <LoaderCircle className="animate-spin" />
        </div>
    );
}
