import { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import corpoFrente from '/img/corpo/corpo-frete.png'; // Ajuste o caminho conforme necessário
import corpoCostas from '/img/corpo/corpo-costas.png'; // Ajuste o caminho conforme necessário
import { useNavigate } from "react-router-dom";


const MuscleSelectionPage = () => {
  const navigate = useNavigate();
  // Grupos musculares com áreas de clique (coordenadas relativas em %)
  const muscleGroups = {
    frontal: [
      { id: 'Peitoral', name: 'Peito', color: 'rgba(255, 82, 82, 0.5)', area: [40, 20, 20, 15] },
      { id: 'ombros', name: 'Ombros', color: 'rgba(33, 150, 243, 0.5)', area: [40, 15, 20, 10] },
      { id: 'biceps', name: 'Bíceps', color: 'rgba(255, 193, 7, 0.5)', area: [30, 25, 10, 15] },
      { id: 'triceps', name: 'Tríceps', color: 'rgba(156, 39, 176, 0.5)', area: [60, 25, 10, 15] },
      { id: 'abdomen', name: 'Abdômen', color: 'rgba(96, 125, 139, 0.5)', area: [40, 35, 20, 15] },
      { id: 'quadriceps', name: 'Quadríceps', color: 'rgba(121, 85, 72, 0.5)', area: [40, 55, 20, 20] }
    ],
    posterior: [
      { id: 'costas', name: 'Costas', color: 'rgba(76, 175, 80, 0.5)', area: [40, 20, 20, 20] },
      { id: 'trapezio', name: 'Trapézio', color: 'rgba(63, 81, 181, 0.5)', area: [40, 15, 20, 10] },
      { id: 'lombar', name: 'Lombar', color: 'rgba(0, 150, 136, 0.5)', area: [40, 40, 20, 10] },
      { id: 'gluteos', name: 'Glúteos', color: 'rgba(233, 30, 99, 0.5)', area: [40, 50, 20, 15] },
      { id: 'posteriores', name: 'Posteriores', color: 'rgba(205, 220, 57, 0.5)', area: [40, 65, 20, 15] },
      { id: 'panturrilhas', name: 'Panturrilhas', color: 'rgba(255, 152, 0, 0.5)', area: [40, 80, 20, 10] }
    ]
  };

  const [selectedView, setSelectedView] = useState('frontal');
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [hoveredMuscle, setHoveredMuscle] = useState(null);
  const imageRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // Atualizar tamanho da imagem quando a view mudar
  useEffect(() => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.offsetWidth,
        height: imageRef.current.offsetHeight
      });
    }
  }, [selectedView]);

  const toggleMuscle = (muscleId) => {
    setSelectedMuscles(prev =>
      prev.includes(muscleId)
        ? prev.filter(id => id !== muscleId)
        : [...prev, muscleId]
    );
  };

  const handleImageClick = (e) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const currentMuscles = selectedView === 'frontal' ? muscleGroups.frontal : muscleGroups.posterior;
    
    const clickedMuscle = currentMuscles.find(muscle => {
      const [mx, my, mw, mh] = muscle.area;
      return x > mx - mw/2 && x < mx + mw/2 && y > my - mh/2 && y < my + mh/2;
    });

    if (clickedMuscle) {
      toggleMuscle(clickedMuscle.id);
    }
  };

  const handleSubmit = () => {
    if (selectedMuscles.length === 0) return;
  
    const query = selectedMuscles.join(",");
    navigate(`/treinoporgrupo/treino?grupos=${query}`);
  };
  

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Selecione os Grupos Musculares</h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Clique nas áreas do corpo para selecionar quais grupos deseja treinar
        </p>

        {/* Controle de visualização */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white rounded-lg shadow p-1">
            <button
              onClick={() => setSelectedView('frontal')}
              className={`px-6 py-2 rounded-md transition-colors ${
                selectedView === 'frontal'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Vista Frontal
            </button>
            <button
              onClick={() => setSelectedView('posterior')}
              className={`px-6 py-2 rounded-md transition-colors ${
                selectedView === 'posterior'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Vista Posterior
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Área da imagem do corpo */}
          <div className="lg:w-2/3 bg-white rounded-xl shadow-lg overflow-hidden">
            <div 
              className="relative cursor-pointer bg-gray-100 flex items-center justify-center"
              onClick={handleImageClick}
            >
              <img
                ref={imageRef}
                src={selectedView === 'frontal' ? corpoFrente : corpoCostas}
                alt={`Corpo ${selectedView === 'frontal' ? 'frontal' : 'posterior'}`}
                className="w-full h-auto max-h-[500px] object-contain"
                onLoad={() => {
                  if (imageRef.current) {
                    setImageSize({
                      width: imageRef.current.offsetWidth,
                      height: imageRef.current.offsetHeight
                    });
                  }
                }}
              />
              
              {/* Sobreposição de áreas clicáveis */}
              <div className="absolute inset-0 pointer-events-none">
                {(selectedView === 'frontal' ? muscleGroups.frontal : muscleGroups.posterior).map(muscle => {
                  const [x, y, w, h] = muscle.area;
                  const isSelected = selectedMuscles.includes(muscle.id);
                  const isHovered = hoveredMuscle === muscle.id;
                  
                  return (
                    <div
                      key={muscle.id}
                      className={`absolute transition-all duration-200 ${
                        isSelected ? 'opacity-70' : isHovered ? 'opacity-50' : 'opacity-0'
                      }`}
                      style={{
                        backgroundColor: muscle.color,
                        left: `${x - w/2}%`,
                        top: `${y - h/2}%`,
                        width: `${w}%`,
                        height: `${h}%`,
                        borderRadius: '4px',
                        pointerEvents: 'none'
                      }}
                    ></div>
                  );
                })}
              </div>
              
              {/* Labels dos músculos */}
              <div className="absolute inset-0 pointer-events-none">
                {(selectedView === 'frontal' ? muscleGroups.frontal : muscleGroups.posterior).map(muscle => {
                  const [x, y] = muscle.area;
                  const isHovered = hoveredMuscle === muscle.id;
                  const isSelected = selectedMuscles.includes(muscle.id);
                  
                  return (
                    (isHovered || isSelected) && (
                      <div
                        key={muscle.id}
                        className="absolute bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {muscle.name}
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>

          {/* Painel de seleção */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Grupos Selecionados</h2>
              
              {selectedMuscles.length > 0 ? (
                <div className="space-y-2">
                  {selectedMuscles.map(muscleId => {
                    const allMuscles = [...muscleGroups.frontal, ...muscleGroups.posterior];
                    const muscle = allMuscles.find(m => m.id === muscleId);
                    return (
                      <div 
                        key={muscleId}
                        className="flex items-center p-3 rounded-lg"
                        style={{ backgroundColor: `${muscle.color.replace('0.5', '0.1')}` }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: muscle.color.replace('0.5', '1') }}
                        ></div>
                        <span className="font-medium">{muscle.name}</span>
                        <button 
                          onClick={() => toggleMuscle(muscleId)}
                          className="ml-auto text-gray-500 hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 italic">Nenhum grupo selecionado</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={selectedMuscles.length === 0}
              className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Gerar Treino ({selectedMuscles.length})
            </button>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-3">Todos os Grupos</h2>
              <div className="grid grid-cols-2 gap-2">
                {[...muscleGroups.frontal, ...muscleGroups.posterior].map(muscle => (
                  <button
                    key={muscle.id}
                    onClick={() => toggleMuscle(muscle.id)}
                    className={`flex items-center p-2 rounded-md text-sm ${
                      selectedMuscles.includes(muscle.id)
                        ? 'font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: muscle.color.replace('0.5', '1') }}
                    ></div>
                    {muscle.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuscleSelectionPage;