import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Test.css';
import { Context } from '../../context/Context';
import swal from 'sweetalert';
import Loader from '@/components/Loader/Loader';

const sectionBQuestions = {
  Realistic: [
    'Activities : When you have free time, do you enjoy doing things like building, fixing, or working outdoors with your hands', 
    'Competence : Do you often find that you are the one people ask when something needs to be repaired or assembled', 
    'Occupation Preference : Can you imagine yourself working as an engineer, mechanic, or someone who builds or designs physical things'
  ],
  Investigative: [
    'Activities : Do you enjoy spending time exploring how things work, doing science experiments, or solving tricky problems', 
    'Competence : Do you consider yourself someone who enjoys deep thinking, research, or figuring things out logically', 
    'Occupation Preference : Can you picture yourself in a career like a doctor, scientist, software developer, or researcher'
  ],
  Artistic: [
    'Activities : When you are being creative drawing, writing stories, making music, or designing do you feel most like yourself', 
    'Competence : Do friends often compliment your creativity or artistic talents, whether in your style, projects, or ideas', 
    'Occupation Preference : Could you see yourself becoming an artist, writer, filmmaker, or someone who brings new ideas to life'
  ],
  Social: [
    'Activities : Do you feel energized when you are helping someone, listening to their problems, or teaching them something new', 
    'Competence : Are you the kind of person others come to when they need advice or emotional support', 
    'Occupation Preference : Can you see yourself working as a teacher, nurse, counselor, or in any job that lets you support and guide others'
  ],
  Enterprising: [
    'Activities : Do you enjoy leading group activities, sharing your ideas with confidence, or motivating others to act', 
    'Competence : Do you naturally take charge in group projects or enjoy convincing others of your point of view', 
    'Occupation Preference : Can you imagine yourself as a business owner, lawyer, politician, or someone who leads teams or sells ideas'
  ],
  Conventional: [
    'Activities : Do you like organizing schedules, keeping things tidy, or working with numbers and detailed information', 
    'Competence :  Are you someone who thrives when there is structure, clear rules, and tasks that need careful planning', 
    'Occupation Preference : Can you picture yourself working as an accountant, office administrator, or data analyst—someone who keeps things running smoothly'
  ]
};

const sectionDSubjects = [
  'English', 'Mathematics', 'Basic Science', 'Basic Technology',
  'Physical and Health Education', 'Civic Education', 'Home Economics',
  'Business Studies', 'Cultural and Creative Arts', 'Literature',
  'Agricultural Science', 'Social Studies'
];

const performanceOptions = [
  '--SELECT OPTION--',
  'VH - (80 above)', 
  'H - (60 -79)', 
  'A - (50 - 59)', 
  'L - (49 - 31)', 
  'VL - (30 below)'
];

export default function Test() {

  const { onSent, loading } = useContext(Context);
  const [formData, setFormData] = useState({
    name: '', 
    age: '', 
    gender: 'Male',
    classChoice: 'Science',
    choiceMaker: 'Parents',
    dreamCareer: '',
    sectionB: {}, 
    sectionD: {},
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRadioChange = (group, index, value) => {
    const key = `${group}-${index}`;
    setFormData(prev => ({
      ...prev,
      sectionB: { ...prev.sectionB, [key]: value }
    }));
  };

  const handleSelectChange = (subject, value) => {
    setFormData(prev => ({
      ...prev,
      sectionD: { ...prev.sectionD, [subject]: value }
    }));
  };

  const buildPrompt = () => {
    const { name, age, gender, classChoice, choiceMaker, dreamCareer, sectionB, sectionD } = formData;
    let prompt = `My name is ${name}, and I am ${age} years old. I am a ${gender} in JSS3 class.\n\n`;
    prompt += `Using RAISEC method also known as Holland Code, my personality assessment are as follows:\n\n`;

    Object.entries(sectionBQuestions).forEach(([group, labels]) => {
      const title = group.charAt(0).toUpperCase();
      prompt += `${title} – ${group.charAt(0).toUpperCase() + group.slice(1)}\n`;
      labels.forEach((label, i) => {
        const qKey = `${group}-${i}`;
        const val = sectionB[qKey] === 'yes'
          ? (label.includes('Competence') && (group === 'Social' || group === 'Conventional') ? 'am' : 'do')
          : (label.includes('Competence') && (group === 'Social' || group === 'Conventional') ? "aren't" : "don't");
        const canVal = val === 'do' || val === 'am' ? 'can' : "can't";

        if (label.includes('Occupation Preference')) {
          prompt += `3. Occupation Preference:\nI ${canVal} imagine myself working as a [related occupation]\n\n`;
        } else {
          prompt += `${i + 1}. ${label}:\nI ${val} enjoy doing this\n\n`;
        }
      });
    });

    prompt += `My choice in senior class is ${classChoice}, and the choice was made by ${choiceMaker}. My dream career is ${dreamCareer}.\n\n`;
    prompt += `I have the following academic performance:\n`;
    Object.entries(sectionD).forEach(([subject, level]) => {
      prompt += `${subject} – ${level}\n`;
    });
    prompt += `\nWhat is my likely career path?\nStarting by addressing the person by their name, provide a brief explanation in fifty words why those careers were suggested, referencing my input. 
    The format of the response should be divided into section 1 (brief explanation in thirty words), section 2 (list of career suggestion, list only 
    with the subheading of likely/suggested career path), section 3 (in one short sectence of fifty words, explain why the suggestions in section two was made)`;

    return prompt;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = buildPrompt();
    try {
      await onSent(prompt);
      navigate('/dashboard');
    } catch (err) {
      swal('Submission failed', err.message, 'error');
    }
  };

  return (
    <div id='test-section' className='p-4 space-y-6 test-main'>
      <h2 className="text-2xl font-bold test-header">Virtual Career Assistant Test</h2>
      <p className='header-subhead'>Instructions: Read each question carefully and answer honestly. There are no right or wrong answers just what feels most like you.</p>

      <h4 className='section-head'>SECTION A – DEMOGRAPHIC INFORMATION</h4>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 form-a" noValidate>
          <div className='section-bg'>
            <label>Name:</label>
            <input type="text" className="w-full border p-2" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required />
            <label>Age:</label>
            <input type="number" className="w-full border p-2" value={formData.age} onChange={e => handleInputChange('age', e.target.value)} required />
            <label>Gender:</label>
            <select className="w-full border p-2 select-opt" value={formData.gender} onChange={e => handleInputChange('gender', e.target.value)} required>
              <option value="" disabled hidden>--SELECT OPTION--</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <h4 className="font-bold section-head">SECTION B – PERSONALITY TEST</h4>
          <div className='section-bg'>
            {Object.entries(sectionBQuestions).map(([group, labels]) => (
              <div key={group} className="mt-2">
                <h4 className="font-semibold capitalize header-subhead header-subhead-wrap">{group}</h4>
                {labels.map((label, i) => (
                  <div key={`${group}-${i}`} className="section-b-radio">
                    <label>{label}?</label>
                    <span className='radio-opt'>YES</span>
                    <label className='radio-opt-label'>
                      <input className='custom-radio-btn' type="radio" name={`${group}-${i}`} value="yes" required onChange={e => handleRadioChange(group, i, e.target.value)} />
                      <span className='checkmark'></span> 
                    </label>
                    <span className='radio-opt'>NO</span>
                    <label>
                      <input className='custom-radio-btn' type="radio" name={`${group}-${i}`} value="no" onChange={e => handleRadioChange(group, i, e.target.value)} />
                      <span className='checkmark'></span> 
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <h4 className="font-bold mt-4 section-head">SECTION C – CHOICE INFLUENCE</h4>
          <div className='section-bg'>
            <label>Choice of class in senior class?</label>
            <select className="w-full border p-2 select-opt" value={formData.classChoice} onChange={e => handleInputChange('classChoice', e.target.value)} required>
              <option value="" disabled hidden>--SELECT OPTION--</option>
              <option>Science</option>
              <option>Arts</option>
              <option>Commercial</option>
              <option>Social science</option>
            </select>
            <label>Who made the choice for you?</label>
            <select className="w-full border p-2 select-opt" value={formData.choiceMaker} onChange={e => handleInputChange('choiceMaker', e.target.value)} required>
              <option value="" disabled hidden>--SELECT OPTION--</option>
              <option>Parents</option>
              <option>Teacher</option>
              <option>My friends</option>
              <option>Myself</option>
              <option>The likeness of the job</option>
            </select>
            <label>What is your dream career?</label>
            <input type="text" className="w-full border p-2" value={formData.dreamCareer} onChange={e => handleInputChange('dreamCareer', e.target.value)} />
          </div>

          <h4 className="font-bold mt-4 section-head">SECTION D – ACADEMIC PERFORMANCE</h4>
          <div className='section-bg'>
            <p className='header-subhead header-subhead-section-d'>SELECT YOUR ACADEMIC PERFORMANCE SO FAR - SN | STATEMENT | VERY HIGH (VH) | HIGH (H) | AVERAGE (A) | LOW (L) | VERY LOW (VL)</p>
            {sectionDSubjects.map(subject => (
              <div key={subject} className="mt-1">
                <label>{subject}:</label>
                <select defaultValue="" className="w-full border p-2 select-opt" onChange={e => handleSelectChange(subject, e.target.value)} required>
                  <option value="" disabled hidden>--SELECT OPTION--</option>
                  {performanceOptions.slice(1).map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            ))}
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
}
