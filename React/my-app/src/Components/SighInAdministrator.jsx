import React, { useState } from 'react';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Password } from 'primereact/password';
import { Create_Administrator } from '../Store/AdministratorSlice';
import CreateAdministrator from './CreateAdministrator';
import PersonalInfo from './PersonalInfo';
import Verification from './Verification';

const SighInAdministrator = () => {

    const Administrator = useSelector(a => a.AdministratorSlice);
    console.log(Administrator);
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);//מצב הכפתור "הבא" 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "Administrator",
        // creditCard: '',
        arrMembers: []

    });

    const items = [
        { label: 'Personal details' },
        { label: 'Verification' },
        { label: 'Add Members' },
        { label: 'Approval and completion' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value, // עדכון השדה לפי שם השדה והערך החדש
        }));

    };

    const handleNext = () => {
        let isValid = true;

        switch (activeIndex) {
            case 0: // Personal details
                isValid = formData.name && formData.email && formData.phone; // בדוק אם כל השדות מולאו
                break;
            case 1: // Verification
                isValid = formData.password; // בדוק אם הסיסמה מולאה
                break;
            case 2: // Add Members
                // אם יש שדות נוספים בשלב זה, בדוק גם אותם
                break;
            default:
                break;
        }

        if (isValid) {
            setActiveIndex(activeIndex + 1);
        } else {
            alert("אנא מלא את כל השדות הנדרשים."); // הודעת שגיאה אם השדות לא מולאו
        }
    };
    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

    };
    const addMembers = () => (
        <div>
            <h2>Add members</h2>
        </div>
    );

    const renderConfirmation = () => (
        <div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                    />
                    אני מאשרת את תנאי השימוש
                </label>
            </div>

            <button
                type="button"
                onClick={() => {
                    console.log("fromData" + formData); // הדפס את המידע שנשלח

                    dispatch(Create_Administrator({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        password: formData.password,
                        role: formData.role,
                        arrMembers: [],
                        arrSecurityCameras: [],
                        arrAnalysisSchema: []
                    }));
                }}
            >
                Create Administrator
            </button>

            <CreateAdministrator />



        </div>
    );


    const renderStepContent = () => {
        switch (activeIndex) {
            case 0:
                return <PersonalInfo formData={formData} handleChange={handleChange} />;
            case 1:
                return <Verification formData={formData} handleChange={handleChange} />;
            case 2:
                return addMembers();
            case 3:
                return renderConfirmation();
            default:
                return null;
        }
    };

    return (
        <div className="App" style={{ width: '60%', margin: '50px auto', direction: 'rtl' }}>
            <Steps model={items} activeIndex={activeIndex} />
            <form onSubmit={handleSubmit}>
                <div style={{ margin: '20px 0' }}>
                    {renderStepContent()}
                </div>
                <div>
                    <Button label="הקודם" icon="pi pi-angle-right" disabled={activeIndex === 0} onClick={handlePrev} className="p-button-secondary" style={{ marginLeft: '10px' }} />
                    {activeIndex < items.length - 1 ? (
                        <Button label="הבא" icon="pi pi-angle-left" iconPos="right" onClick={handleNext} />
                    ) : (
                        <Button type="submit" label="שלח" icon="pi pi-check" />
                    )}
                </div>

            </form>
        </div>

    );
}

export default SighInAdministrator;