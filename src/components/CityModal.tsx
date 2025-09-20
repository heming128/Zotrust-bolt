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
    'Abohar', 'Achalpur', 'Adoni', 'Agartala', 'Agra', 'Ahmedabad', 'Ahmednagar', 'Aizawl', 'Ajmer', 'Akbarpur', 'Akhnoor', 'Akola', 'Alappuzha', 'Aligarh', 'Alipurduar', 'Allahabad', 'Alwar', 'Ambajogai', 'Ambala', 'Ambattur', 'Amravati', 'Amreli', 'Amritsar', 'Amroha', 'Anand', 'Anantnag', 'Anantapur', 'Ankleshwar', 'Angul', 'Arnia', 'Arrah', 'Asansol', 'Aurangabad', 'Azamgarh',
    'Baddi', 'Badlapur', 'Bagaha', 'Bageshwar', 'Bahadurgarh', 'Baharampur', 'Bahraich', 'Balasore', 'Ballia', 'Balurghat', 'Banda', 'Bandipore', 'Bangalore', 'Bangaon', 'Bankura', 'Banswara', 'Baramulla', 'Barabanki', 'Barbil', 'Bardhaman', 'Bareilly', 'Baripada', 'Barmer', 'Barnala', 'Barshi', 'Basirhat', 'Basti', 'Batala', 'Bathinda', 'Beawar', 'Beed', 'Begusarai', 'Belagavi', 'Belgaum', 'Belonia', 'Betul', 'Bhadrak', 'Bhadravati', 'Bhagalpur', 'Bharatpur', 'Bharuch', 'Bhavnagar', 'Bhawanipatna', 'Bhilai', 'Bhilwara', 'Bhimavaram', 'Bhind', 'Bhiwandi', 'Bhiwani', 'Bhopal', 'Bhubaneswar', 'Bhuj', 'Bhusawal', 'Bicholim', 'Bidar', 'Bihar Sharif', 'Bijapur', 'Bikaner', 'Bilaspur', 'Bijnor', 'Bishnah', 'Bishnupur', 'Bokaro', 'Bolpur', 'Bongaigaon', 'Botad', 'Brahmapur', 'Budaun', 'Budgam', 'Bulandshahr', 'Burhanpur', 'Buxar',
    'Canacona', 'Chamba', 'Chaibasa', 'Chakdaha', 'Chandausi', 'Chandigarh', 'Chandrapur', 'Chatra', 'Chennai', 'Chhapra', 'Chhindwara', 'Chhatarpur', 'Chilakaluripet', 'Chirkunda', 'Chitradurga', 'Chittoor', 'Chittorgarh', 'Churachandpur', 'Coimbatore', 'Cooch Behar', 'Cuddalore', 'Cuncolim', 'Curchorem', 'Cuttack',
    'Dahod', 'Dalhousie', 'Daman', 'Damoh', 'Danapur', 'Dankuni', 'Darbhanga', 'Darjeeling', 'Datia', 'Davangere', 'Deesa', 'Dehradun', 'Dehri', 'Delhi', 'Deoghar', 'Deoria', 'Dewas', 'Dhanbad', 'Dharbandora', 'Dharmanagar', 'Dharmavaram', 'Dharwad', 'Dhenkanal', 'Dhubri', 'Dhulian', 'Dindigul', 'Dindori', 'Diphu', 'Dibrugarh', 'Dimapur', 'Diu', 'Doda', 'Dumka', 'Durgapur',
    'Eluru', 'Ernakulam', 'Erode', 'Etah', 'Etawah',
    'Faridabad', 'Faridkot', 'Farrukhabad', 'Fatehpur', 'Fazilka', 'Firozabad', 'Firozpur',
    'Ganderbal', 'Gandhidham', 'Ganganagar', 'Gangtok', 'Gaya', 'Geyzing', 'Ghaziabad', 'Ghazipur', 'Ghumarwin', 'Giridih', 'Goalpara', 'Gobindgarh', 'Godhra', 'Gondia', 'Gonda', 'Gondal', 'Gorakhpur', 'Gudivada', 'Gulbarga', 'Gumla', 'Guna', 'Guntur', 'Guntakal', 'Gurdaspur', 'Gurgaon', 'Guwahati', 'Gwalior',
    'Habra', 'Haflong', 'Hajipur', 'Haldia', 'Haldwani', 'Haldwani-cum-Kathgodam', 'Hamirpur', 'Hansi', 'Hanumangarh', 'Hapur', 'Hardoi', 'Haridwar', 'Hassan', 'Hathras', 'Hazaribagh', 'Hindupur', 'Hinganghat', 'Hisar', 'Hoshiarpur', 'Hospet', 'Howrah', 'Hubli', 'Hubli-Dharwad', 'Hyderabad',
    'Ichalkaranji', 'Idukki', 'Imphal', 'Indore', 'Itanagar', 'Itarsi',
    'Jabalpur', 'Jagadhri', 'Jaipur', 'Jalandhar', 'Jalpaiguri', 'Jamalpur', 'Jammu', 'Jamnagar', 'Jamshedpur', 'Jangipur', 'Jaspur', 'Jawalamukhi', 'Jehanabad', 'Jetpur', 'Jeypore', 'Jhabrera', 'Jhansi', 'Jharsuguda', 'Jhunjhunu', 'Jind', 'Jodhpur', 'Joginder Nagar', 'Jogindernagar', 'Jorhat', 'Jourian',
    'Kadapa', 'Kailasahar', 'Kaithal', 'Kalol', 'Kalyan-Dombivli', 'Kanchipuram', 'Kangra', 'Kannur', 'Kanpur', 'Kapurthala', 'Karaikal', 'Karimganj', 'Karimnagar', 'Kargil', 'Karnal', 'Karur', 'Kasaragod', 'Kashipur', 'Kathua', 'Katihar', 'Kavaratti', 'Kendujhar', 'Kharar', 'Khammam', 'Khanna', 'Kharagpur', 'Khargone', 'Khowai', 'Khurja', 'Kichha', 'Kishanganj', 'Kishangarh', 'Kishtwar', 'Kochi', 'Kohima', 'Kolar', 'Kolhapur', 'Kolkata', 'Kollam', 'Kosli', 'Kota', 'Kottayam', 'Kozhikode', 'Krishnanagar', 'Kullu', 'Kulgam', 'Kumarghat', 'Kupwara',
    'Laksar', 'Lakhimpur', 'Lalitpur', 'Lanka', 'Latur', 'Leh', 'Loni', 'Lucknow', 'Ludhiana', 'Lumding', 'Lunglei',
    'Machilipatnam', 'Madanapalle', 'Madhupur', 'Madurai', 'Mahe', 'Mahbubnagar', 'Mainpuri', 'Makrana', 'Malappuram', 'Malda', 'Malerkotla', 'Malout', 'Manali', 'Mandya', 'Mandi', 'Mandsaur', 'Mangan', 'Mangalore', 'Manglaur', 'Mangaldoi', 'Mankachar', 'Mansa', 'Mapusa', 'Margao', 'Margherita', 'Mathura', 'Mau', 'Medininagar', 'Medinipur', 'Meerut', 'Mehatpur', 'Mihijam', 'Mira-Bhayandar', 'Mirzapur', 'Modinagar', 'Moga', 'Mohali', 'Mokokchung', 'Moradabad', 'Morbi', 'Morena', 'Motihari', 'Mumbai', 'Munger', 'Muktsar', 'Murkongselek', 'Mussoorie', 'Muzaffarnagar', 'Muzaffarpur', 'Mysore',
    'Nabadwip', 'Nabha', 'Nadiad', 'Nagaon', 'Nagapattinam', 'Nagda', 'Nagla', 'Nagpur', 'Nahan', 'Naharkatiya', 'Naharlagun', 'Nainital', 'Nalbari', 'Namchi', 'Namsai', 'Nanded', 'Nandurbar', 'Nandyal', 'Narasaraopet', 'Narmadapuram', 'Narnaul', 'Nashik', 'Navi Mumbai', 'Navsari', 'Nawada', 'Nayagarh', 'Nellore', 'Neemuch', 'Neyveli', 'Nizamabad', 'Noida', 'North Lakhimpur', 'Nurpur',
    'Ongole', 'Orai', 'Osmanabad',
    'Pakaur', 'Palakkad', 'Palampur', 'Palanpur', 'Pali', 'Palwal', 'Panaji', 'Panchkula', 'Panipat', 'Panisagar', 'Panvel', 'Paonta Sahib', 'Parbhani', 'Parwanoo', 'Pasighat', 'Patan', 'Pathanamthitta', 'Pathankot', 'Patiala', 'Patna', 'Pauri', 'Pernem', 'Phagwara', 'Phusro', 'Pilibhit', 'Pimpri-Chinchwad', 'Pithampur', 'Pithoragarh', 'Ponda', 'Porbandar', 'Port Blair', 'Pratapgarh', 'Proddatur', 'Puducherry', 'Pudukkottai', 'Pulwama', 'Punch', 'Pundri', 'Pune', 'Puri', 'Purnia', 'Purulia',
    'Quepem',
    'Raebareli', 'Raichur', 'Raiganj', 'Raipur', 'Rajapalayam', 'Rajauri', 'Rajkot', 'Rajpura', 'Ramban', 'Ramgarh', 'Ramnagar', 'Rampur', 'Rampur Bushahr', 'Ranaghat', 'Ranchi', 'Rangia', 'Ranirbazar', 'Ratlam', 'Rayagada', 'Reasi', 'Rewa', 'Rewari', 'Rishikesh', 'Robertsonpet', 'Rohru', 'Rohtak', 'Roorkee', 'Rourkela', 'R.S. Pura', 'Rudrapur',
    'Sabroom', 'Sagar', 'Saharanpur', 'Saharsa', 'Sahaspur', 'Sahaswan', 'Sahibganj', 'Saiha', 'Salem', 'Samba', 'Sambalpur', 'Sambhal', 'Sangli-Miraj & Kupwad', 'Sangrur', 'Sanguem', 'Sanquelim', 'Santokhgarh', 'Sasaram', 'Satara', 'Satna', 'Sattari', 'Sawai Madhopur', 'Sehore', 'Selaqui', 'Seoni', 'Shahjahanpur', 'Shamshi', 'Shantipur', 'Shimla', 'Shimoga', 'Shivpuri', 'Shopian', 'Sibsagar', 'Sikar', 'Siliguri', 'Silchar', 'Silvassa', 'Singrauli', 'Sirsa', 'Sitamarhi', 'Sitarganj', 'Sitapur', 'Siwan', 'Sivakasi', 'Solan', 'Solapur', 'Sonamura', 'Sonipat', 'Sopore', 'Srinagar', 'Suchetgarh', 'Sultanpur', 'Sunabeda', 'Sunam', 'Sundernagar', 'Surendranagar', 'Surat',
    'Tadipatri', 'Tadepalligudem', 'Tanda', 'Tarn Taran', 'Tehri', 'Teliamura', 'Tenali', 'Tezpur', 'Thane', 'Thanesar', 'Thanjavur', 'Thiruvananthapuram', 'Thoothukudi', 'Thoubal', 'Thrissur', 'Tinsukia', 'Tira Sujanpur', 'Tiruchirappalli', 'Tirupati', 'Tiruppur', 'Tiruvallur', 'Tumkur', 'Tonk',
    'Udaipur', 'Udhampur', 'Udupi', 'Udgir', 'Ujhani', 'Ujjain', 'Ulhasnagar', 'Una', 'Unnao',
    'Vadodara', 'Valsad', 'Vapi', 'Varanasi', 'Vasco da Gama', 'Vasai-Virar', 'Vellore', 'Veraval', 'Vidisha', 'Vijayawada', 'Vijaypur', 'Viluppuram', 'Visakhapatnam',
    'Wokha', 'Warangal', 'Wardha', 'Wayanad',
    'Yamunanagar', 'Yanam', 'Yavatmal', 'Yol',
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