import React from 'react';
import { useState } from 'react';

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: string) => void;
}

const CityModal: React.FC<CityModalProps> = ({ isOpen, onClose, onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const indianCities = [
    // Major Metropolitan Cities
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai',
    'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
    'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
    'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar', 'Varanasi',
    'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
    'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada',
    'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh',
    'Solapur', 'Hubli-Dharwad', 'Tiruchirappalli', 'Bareilly', 'Mysore', 'Tiruppur',
    'Gurgaon', 'Aligarh', 'Jalandhar', 'Bhubaneswar', 'Salem', 'Mira-Bhayandar',
    'Warangal', 'Guntur', 'Bhiwandi', 'Saharanpur', 'Gorakhpur', 'Bikaner',
    'Amravati', 'Noida', 'Jamshedpur', 'Bhilai', 'Cuttack', 'Firozabad',
    'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol',
    'Rourkela', 'Nanded', 'Kolhapur', 'Ajmer', 'Akola', 'Gulbarga',
    'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar',
    'Jammu', 'Sangli-Miraj & Kupwad', 'Mangalore', 'Erode', 'Belgaum', 'Ambattur',
    
    // Additional Major Cities
    'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Malappuram', 'Kollam',
    'Alappuzha', 'Palakkad', 'Kannur', 'Kasaragod', 'Kottayam',
    'Idukki', 'Pathanamthitta', 'Wayanad', 'Ernakulam',
    
    // Tamil Nadu Cities
    'Vellore', 'Thoothukudi', 'Dindigul', 'Thanjavur', 'Cuddalore',
    'Kanchipuram', 'Karur', 'Neyveli', 'Rajapalayam', 'Sivakasi',
    'Pudukkottai', 'Nagapattinam', 'Viluppuram', 'Tiruvallur',
    
    // Karnataka Cities
    'Hubli', 'Dharwad', 'Shimoga', 'Davangere', 'Bellary', 'Bijapur',
    'Tumkur', 'Raichur', 'Bidar', 'Hospet', 'Gadag-Betageri', 'Robertsonpet',
    'Hassan', 'Bhadravati', 'Chitradurga', 'Udupi', 'Kolar', 'Mandya',
    
    // Andhra Pradesh & Telangana
    'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar',
    'Tirupati', 'Anantapur', 'Kadapa', 'Eluru', 'Ongole', 'Nandyal',
    'Machilipatnam', 'Adoni', 'Tenali', 'Proddatur', 'Chittoor', 'Hindupur',
    'Bhimavaram', 'Madanapalle', 'Guntakal', 'Dharmavaram', 'Gudivada',
    'Narasaraopet', 'Tadipatri', 'Tadepalligudem', 'Chilakaluripet',
    
    // Maharashtra Cities
    'Akola', 'Latur', 'Ahmednagar', 'Chandrapur', 'Parbhani', 'Ichalkaranji',
    'Jalna', 'Ambajogai', 'Bhusawal', 'Panvel', 'Badlapur', 'Beed',
    'Gondia', 'Satara', 'Barshi', 'Yavatmal', 'Achalpur', 'Osmanabad',
    'Nandurbar', 'Wardha', 'Udgir', 'Hinganghat',
    
    // Gujarat Cities
    'Anand', 'Nadiad', 'Morbi', 'Surendranagar', 'Bharuch', 'Vapi',
    'Navsari', 'Veraval', 'Porbandar', 'Godhra', 'Bhuj', 'Ankleshwar',
    'Botad', 'Gondal', 'Jetpur', 'Kalol', 'Dahod', 'Gandhidham',
    'Palanpur', 'Valsad', 'Patan', 'Deesa', 'Amreli',
    
    // Rajasthan Cities
    'Kota', 'Bharatpur', 'Pali', 'Tonk', 'Kishangarh', 'Beawar',
    'Hanumangarh', 'Sikar', 'Alwar', 'Bhilwara', 'Ganganagar', 'Banswara',
    'Pratapgarh', 'Chittorgarh', 'Jhunjhunu', 'Barmer', 'Bharatpur',
    'Sawai Madhopur', 'Nagaur', 'Makrana',
    
    // Uttar Pradesh Cities
    'Moradabad', 'Muzaffarnagar', 'Mathura', 'Budaun', 'Rampur',
    'Shahjahanpur', 'Farrukhabad', 'Mau', 'Hapur', 'Etawah',
    'Mirzapur', 'Bulandshahr', 'Sambhal', 'Amroha', 'Hardoi',
    'Fatehpur', 'Raebareli', 'Orai', 'Sitapur', 'Bahraich',
    'Modinagar', 'Unnao', 'Jhansi', 'Lakhimpur', 'Hathras',
    'Banda', 'Pilibhit', 'Barabanki', 'Khurja', 'Gonda',
    'Mainpuri', 'Lalitpur', 'Etah', 'Deoria', 'Ujhani',
    'Ghazipur', 'Sultanpur', 'Azamgarh', 'Bijnor', 'Sahaswan',
    'Basti', 'Chandausi', 'Akbarpur', 'Ballia', 'Tanda',
    
    // Madhya Pradesh Cities
    'Gwalior', 'Ujjain', 'Dewas', 'Satna', 'Ratlam', 'Rewa',
    'Sagar', 'Singrauli', 'Burhanpur', 'Khandwa', 'Bhind',
    'Chhindwara', 'Guna', 'Shivpuri', 'Vidisha', 'Chhatarpur',
    'Damoh', 'Mandsaur', 'Khargone', 'Neemuch', 'Pithampur',
    'Narmadapuram', 'Itarsi', 'Sehore', 'Morena', 'Betul',
    'Seoni', 'Datia', 'Nagda', 'Dindori',
    
    // West Bengal Cities
    'Durgapur', 'Siliguri', 'Asansol', 'Bardhaman', 'Malda',
    'Baharampur', 'Habra', 'Kharagpur', 'Shantipur', 'Dankuni',
    'Dhulian', 'Ranaghat', 'Haldia', 'Raiganj', 'Krishnanagar',
    'Nabadwip', 'Medinipur', 'Jalpaiguri', 'Balurghat', 'Basirhat',
    'Bankura', 'Chakdaha', 'Darjeeling', 'Alipurduar', 'Purulia',
    'Jangipur', 'Bolpur', 'Bangaon', 'Cooch Behar',
    
    // Bihar Cities
    'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga',
    'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar', 'Munger',
    'Chhapra', 'Danapur', 'Saharsa', 'Hajipur', 'Sasaram',
    'Dehri', 'Siwan', 'Motihari', 'Nawada', 'Bagaha',
    'Buxar', 'Kishanganj', 'Sitamarhi', 'Jamalpur', 'Jehanabad',
    
    // Jharkhand Cities
    'Dhanbad', 'Ranchi', 'Jamshedpur', 'Bokaro', 'Deoghar',
    'Phusro', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Medininagar',
    'Chirkunda', 'Pakaur', 'Chaibasa', 'Mihijam', 'Chatra',
    'Gumla', 'Dumka', 'Madhupur', 'Sahibganj',
    
    // Odisha Cities
    'Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur',
    'Puri', 'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda',
    'Jeypore', 'Bhawanipatna', 'Dhenkanal', 'Barbil', 'Kendujhar',
    'Sunabeda', 'Rayagada', 'Belagavi', 'Angul', 'Nayagarh',
    
    // Punjab Cities
    'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda',
    'Mohali', 'Firozpur', 'Batala', 'Pathankot', 'Moga',
    'Abohar', 'Malerkotla', 'Khanna', 'Phagwara', 'Muktsar',
    'Barnala', 'Rajpura', 'Hoshiarpur', 'Kapurthala', 'Faridkot',
    'Sunam', 'Sangrur', 'Fazilka', 'Gurdaspur', 'Kharar',
    'Gobindgarh', 'Mansa', 'Malout', 'Nabha', 'Tarn Taran',
    
    // Haryana Cities
    'Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar',
    'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula',
    'Bhiwani', 'Sirsa', 'Bahadurgarh', 'Jind', 'Thanesar',
    'Kaithal', 'Rewari', 'Narnaul', 'Pundri', 'Kosli',
    'Palwal', 'Hansi', 'Aurangabad', 'Jagadhri',
    
    // Himachal Pradesh Cities
    'Shimla', 'Solan', 'Dharamshala', 'Mandi', 'Palampur',
    'Baddi', 'Nahan', 'Paonta Sahib', 'Sundernagar', 'Chamba',
    'Una', 'Kullu', 'Hamirpur', 'Bilaspur', 'Yol', 'Jogindernagar',
    'Nurpur', 'Kangra', 'Santokhgarh', 'Mehatpur', 'Shamshi',
    'Parwanoo', 'Manali', 'Tira Sujanpur', 'Ghumarwin', 'Dalhousie',
    'Rohru', 'Naggar', 'Rampur Bushahr', 'Jawalamukhi', 'Joginder Nagar',
    
    // Uttarakhand Cities
    'Dehradun', 'Haridwar', 'Roorkee', 'Haldwani-cum-Kathgodam', 'Rudrapur',
    'Kashipur', 'Rishikesh', 'Ramnagar', 'Pithoragarh', 'Jaspur',
    'Kichha', 'Sitarganj', 'Bageshwar', 'Haldwani', 'Nainital',
    'Mussoorie', 'Tehri', 'Pauri', 'Nagla', 'Manglaur',
    'Laksar', 'Jhabrera', 'Sahaspur', 'Selaqui',
    
    // Assam Cities
    'Guwahati', 'Silchar', 'Dibrugarh', 'Nagaon', 'Tinsukia',
    'Jorhat', 'Bongaigaon', 'Dhubri', 'Diphu', 'North Lakhimpur',
    'Tezpur', 'Karimganj', 'Sibsagar', 'Goalpara', 'Barpeta',
    'Mankachar', 'Nalbari', 'Rangia', 'Margherita', 'Mangaldoi',
    'Lumding', 'Haflong', 'Murkongselek', 'Naharkatiya', 'Lanka',
    
    // Other North Eastern States
    'Imphal', 'Churachandpur', 'Bishnupur', 'Thoubal', 'Dimapur',
    'Kohima', 'Wokha', 'Mokokchung', 'Aizawl', 'Lunglei',
    'Saiha', 'Agartala', 'Dharmanagar', 'Udaipur', 'Kailasahar',
    'Belonia', 'Khowai', 'Pratapgarh', 'Ranirbazar', 'Sonamura',
    'Panisagar', 'Kumarghat', 'Sonamura', 'Teliamura', 'Sabroom',
    'Itanagar', 'Naharlagun', 'Pasighat', 'Namsai', 'Margherita',
    'Gangtok', 'Namchi', 'Geyzing', 'Mangan',
    
    // Goa Cities
    'Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda',
    'Bicholim', 'Curchorem', 'Sanquelim', 'Cuncolim', 'Quepem',
    'Canacona', 'Sanguem', 'Pernem', 'Sattari', 'Dharbandora',
    
    // Union Territories
    'Port Blair', 'Kavaratti', 'Daman', 'Diu', 'Silvassa',
    'Puducherry', 'Karaikal', 'Yanam', 'Mahe',
    
    // Jammu & Kashmir / Ladakh
    'Jammu', 'Srinagar', 'Anantnag', 'Baramulla', 'Sopore',
    'Kathua', 'Udhampur', 'Punch', 'Rajauri', 'Leh',
    'Kargil', 'Kupwara', 'Bandipore', 'Ganderbal', 'Kulgam',
    'Pulwama', 'Shopian', 'Budgam', 'Doda', 'Kishtwar',
    'Ramban', 'Reasi', 'Samba', 'Akhnoor', 'Vijaypur',
    'Bishnah', 'Suchetgarh', 'Arnia', 'R.S. Pura', 'Jourian'
  ];

  // Filter cities based on search term
  const filteredCities = indianCities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (city: string) => {
    onSelectCity(city);
    setSearchTerm(''); // Clear search when closing
    onClose();
  };

  const handleClose = () => {
    setSearchTerm(''); // Clear search when closing
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="city-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Select Your City</h3>
          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-content">
          <p className="modal-description">
            Choose your city to find nearby traders in your area
          </p>
          
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="city-search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          {filteredCities.length === 0 ? (
            <div className="no-results">
              <span className="no-results-icon">🏙️</span>
              <p>No cities found matching "{searchTerm}"</p>
              <p className="no-results-suggestion">Try searching with a different term</p>
            </div>
          ) : (
            <>
              <div className="results-count">
                {searchTerm && (
                  <p className="search-results-text">
                    Found {filteredCities.length} cities matching "{searchTerm}"
                  </p>
                )}
              </div>
              
              <div className="cities-grid">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    className="city-option"
                    onClick={() => handleCitySelect(city)}
                  >
                    📍 {city}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityModal;