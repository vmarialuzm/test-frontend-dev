import { useLocation } from "react-router-dom";
import { useState } from "react";

const CursoCard = () => {
    const { state } = useLocation();
    const { course } = state || {};

    if (!course) {
        return <p>No se encontró información del curso.</p>
    }

    
    // Estado para la clase seleccionada, por defecto el 1er elemento
    const [selectedClaseIndex, setSelectedClaseIndex] = useState(0);
    const selectedClase = course.clases[selectedClaseIndex];

    const getEmbedUrl = (url) => {
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    return (
        <div className="text-white px-12">

            <div className="py-8">
                <h1 className="font-bold">{course.titulo}</h1>
                <p>{course.descripcion}</p>
            </div>

            <h2 className="font-bold pb-8">Clases del curso</h2>
            <div className="flex">
                <div className="w-1/2">
                    <ul>
                        {course.clases.map((clase, i) => (
                            <li 
                                key={i} 
                                onClick={() => setSelectedClaseIndex(i)}
                                className={`relative pl-8 pb-8 hover:bg-gray-800 rounded-2xl cursor-pointer ${
                                    selectedClaseIndex === i ? "bg-gray-800" : ""
                                }`}
                            >
                                {/* Línea vertical */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-400"></div>
                                {/* Bolita */}
                                <span className="absolute left-[-6px] top-2 w-4 h-4 bg-gray-400 rounded-full"></span>
                                <div>
                                    <p>{clase.titulo}</p>
                                    <p>{clase.descripcion}</p>
                                    <p>{clase.completado ? "Completado": clase.duracion}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-1/2 pl-4">
                    <div className="aspect-video w-full">
                        <iframe 
                            src={getEmbedUrl(selectedClase.video)} 
                            frameBorder="0"         
                            className="w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            title={selectedClase.titulo}
                        ></iframe>  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CursoCard;