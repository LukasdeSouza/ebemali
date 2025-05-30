import { Clock, DollarSign, MapPin, Phone, Plus, Save, Shield, Trash2 } from "lucide-react";
import { useState } from "react";
import type { CampingDetailsInteface } from "../../../../types/camping";
import { campingsDatabase } from "../../../../data";

const CampingRegistration = () => {
  const [formData, setFormData] = useState<CampingDetailsInteface>({
    id: '',
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    images: [''],
    rating: 0,
    totalReviews: 0,
    coordinates: {
      lat: null,
      lng: null
    },
    prices: {
      motorcycle: null,
      car: null,
      van: null,
      kiosk: null,
      motorhome: null
    },
    amenities: {
      store: false,
      bathrooms: false,
      electricity: false,
      motorhomeSupport: false,
      wifi: false,
      security: false,
      restaurant: false,
      playground: false
    },
    workingHours: {
      open: '',
      close: '',
      days: ''
    },
    contact: {
      phone: '',
      email: '',
      website: ''
    },
    rules: ['']
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => {
        const newData = { ...prev };
        (newData as any)[parent] = {
          ...(newData as any)[parent],
          [child]: value
        };
        return newData;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayChange = (field: 'images' | 'rules', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'images' | 'rules') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'images' | 'rules', index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = () => {
    // Gerar ID único
    const campingData = {
      ...formData,
      id: Date.now().toString(),
      images: formData.images.filter(img => img.trim() !== ''),
      rules: formData.rules.filter(rule => rule.trim() !== '')
    };

    // Adicionar ao array de campings
    campingsDatabase.push(campingData);

    console.log('Camping cadastrado:', campingData);
    console.log('Total de campings:', campingsDatabase.length);
    console.log('Database completa:', campingsDatabase);

    setIsSubmitted(true);

    // Reset form após 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        id: '',
        name: '',
        description: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        images: [''],
        rating: 0,
        totalReviews: 0,
        coordinates: { lat: 0, lng: 0 },
        prices: { motorcycle: 0, car: 0, van: 0, kiosk: 0, motorhome: 0 },
        amenities: {
          store: false,
          bathrooms: false,
          electricity: false,
          motorhomeSupport: false,
          wifi: false,
          security: false,
          restaurant: false,
          playground: false
        },
        workingHours: { open: '', close: '', days: '' },
        contact: { phone: '', email: '', website: '' },
        rules: ['']
      });
      setCurrentStep(1);
    }, 3000);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md border border-gray-200">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Save className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Camping Cadastrado!</h2>
          <p className="text-gray-600 mb-6">O camping foi salvo com sucesso na base de dados.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md font-medium transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-yellow-400 p-6 text-black">
            <h1 className="text-3xl font-bold mb-4">Cadastro de Camping</h1>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step <= currentStep ? 'bg-black text-yellow-400' : 'bg-gray-200 text-gray-700'
                    }`}>
                    {step}
                  </div>
                  {step < 4 && <div className="w-8 h-1 bg-gray-300 mx-2" />}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Step 1: Informações Básicas */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">
                  <MapPin className="inline mr-2 mb-1" />
                  Informações Básicas
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Nome do camping"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Cidade"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descreva o camping..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Endereço completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="UF"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="00000-000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.coordinates.lat ?? ""}
                      onChange={(e) => handleInputChange('coordinates.lat', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="-23.550520"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.coordinates.lng ?? ""}
                      onChange={(e) => handleInputChange('coordinates.lng', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="-46.633309"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Preços e Comodidades */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">
                  <DollarSign className="inline mr-2 mb-1" />
                  Preços e Comodidades
                </h2>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Preços por Tipo de Veículo</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Moto</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.prices.motorcycle ?? ""}
                        onChange={(e) => handleInputChange('prices.motorcycle', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Carro</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.prices.car ?? ''}
                        onChange={(e) => handleInputChange('prices.car', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Van</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.prices.van ?? ''}
                        onChange={(e) => handleInputChange('prices.van', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Quiosque</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.prices.kiosk ?? ''}
                        onChange={(e) => handleInputChange('prices.kiosk', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Motorhome</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.prices.motorhome ?? ''}
                        onChange={(e) => handleInputChange('prices.motorhome', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Comodidades Disponíveis</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.keys(formData.amenities).map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.amenities[amenity as keyof typeof formData.amenities]}
                          onChange={(e) => handleInputChange(`amenities.${amenity}`, e.target.checked)}
                          className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {amenity.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Horários e Contato */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">
                  <Clock className="inline mr-2 mb-1" />
                  Horários e Contato
                </h2>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Horário de Funcionamento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Abertura</label>
                      <input
                        type="time"
                        value={formData.workingHours.open}
                        onChange={(e) => handleInputChange('workingHours.open', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Fechamento</label>
                      <input
                        type="time"
                        value={formData.workingHours.close}
                        onChange={(e) => handleInputChange('workingHours.close', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Dias</label>
                      <input
                        type="text"
                        value={formData.workingHours.days}
                        onChange={(e) => handleInputChange('workingHours.days', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="Segunda a Domingo"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Informações de Contato
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Telefone</label>
                      <input
                        type="tel"
                        value={formData.contact.phone}
                        onChange={(e) => handleInputChange('contact.phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.contact.email}
                        onChange={(e) => handleInputChange('contact.email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="contato@camping.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Website</label>
                      <input
                        type="url"
                        value={formData.contact.website}
                        onChange={(e) => handleInputChange('contact.website', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="https://www.camping.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Avaliação (0-5)</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="4.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Total de Avaliações</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.totalReviews}
                      onChange={(e) => handleInputChange('totalReviews', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="150"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Imagens e Regras */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">
                  <Shield className="inline mr-2 mb-1" />
                  Imagens e Regras
                </h2>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">URLs das Imagens</h3>
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => handleArrayChange('images', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('images', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        disabled={formData.images.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('images')}
                    className="flex items-center space-x-2 text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Imagem</span>
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Regras do Camping</h3>
                  {formData.rules.map((rule, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={rule}
                        onChange={(e) => handleArrayChange('rules', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="Digite uma regra do camping"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('rules', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        disabled={formData.rules.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('rules')}
                    className="flex items-center space-x-2 text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Regra</span>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              <span className="text-sm text-gray-500">
                Passo {currentStep} de 4
              </span>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 font-medium transition-colors"
                >
                  Próximo
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 font-medium transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Cadastrar Camping</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampingRegistration;