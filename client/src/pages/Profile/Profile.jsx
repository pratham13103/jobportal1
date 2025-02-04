import { useState } from "react";
import styles from "./styles.module.css";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

function Profile() {
    const [user, setUser] = useState({
        name: "Prathamesh Jaiswal",
        dob: "2001-01-01",
        gender: "Male",
        location: "India",
        phone: "9876543210",
        profileImage: ""
    });

    const [education, setEducation] = useState({
        university: "",
        highestQualification: "",
        course: "",
        specialization: ""
    });

    const handleImageChange = (e) => { 
        const file = e.target.files?.[0];
        if (file) {
            setUser({ ...user, profileImage: URL.createObjectURL(file) });
        }
    };

    const handleRemoveImage = () => {
        setUser({ ...user, profileImage: "" });
    };

    return (
         <div className={styles.profileContainer}>
            <h1 className={styles.heading}>Profile</h1>
            <div className={styles.cardContainer}>
                
                {/* Profile Image */}
                <div className={styles.card}>
                    <h2>Profile Image</h2>
                    <div className={styles.imageWrapper}>
                        {user.profileImage ? (
                            <>
                                <img src={user.profileImage} alt="Profile" className={styles.profileImage} />
                                <div className={styles.overlay}>
                                    <button onClick={handleRemoveImage} className={styles.removeButton}>
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            </>
                        ) : (
                            <label className={styles.emptyCircle}>
                                <FaPlus className={styles.addIcon} />
                                <span className={styles.addText}>Add Photo</span>
                                <input type="file" accept="image/*" onChange={handleImageChange} className={styles.hiddenInput} />
                            </label>
                        )}
                    </div>
                </div>

                {/* Personal Information */}
                <div className={styles.card}>
                    <h2>Personal Information</h2>
                    <label>Name:</label>
                    <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    <label>Date of Birth:</label>
                    <input type="date" value={user.dob} onChange={(e) => setUser({ ...user, dob: e.target.value })} />
                    <label>Gender:</label>
                    <input type="text" value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })} />
                    <label>Location:</label>
                    <input type="text" value={user.location} onChange={(e) => setUser({ ...user, location: e.target.value })} />
                    <label>Phone:</label>
                    <input type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                </div>

                {/* Education Details */}
                <div className={styles.card}>
    <h2>Education Details</h2>
    
    <label>University:</label>
    <input
        type="text"
        value={education.university}
        onChange={(e) => setEducation({ ...education, university: e.target.value })}
    />

    <label>Highest Qualification:</label>
    <input
        type="text"
        value={education.highestQualification}
        onChange={(e) => setEducation({ ...education, highestQualification: e.target.value })}
    />

    <label>Course:</label>
    <input
        type="text"
        value={education.course}
        onChange={(e) => setEducation({ ...education, course: e.target.value })}
    />

    <label>Specialization:</label>
    <input
        type="text"
        value={education.specialization}
        onChange={(e) => setEducation({ ...education, specialization: e.target.value })}
    />
    
    <label>Course Type:</label>
    <select
        value={education.courseType}
        onChange={(e) => setEducation({ ...education, courseType: e.target.value })}
    >
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Distance Learning">Distance Learning</option>
    </select>
    
    <label>Start Year:</label>
    <input
        type="number"
        value={education.startYear}
        onChange={(e) => setEducation({ ...education, startYear: e.target.value })}
        min="1900" max="2099"
    />

    <label>Passing Year:</label>
    <input
        type="number"
        value={education.passingYear}
        onChange={(e) => setEducation({ ...education, passingYear: e.target.value })}
        min="1900" max="2099"
    />

    <label>Grading System:</label>
    <select
        value={education.gradingSystem}
        onChange={(e) => setEducation({ ...education, gradingSystem: e.target.value })}
    >
        <option value="Percentage">Percentage</option>
        <option value="CGPA">CGPA</option>
    </select>

    {education.gradingSystem === "CGPA" && (
        <>
            <label>CGPA:</label>
            <input
                type="number"
                value={education.cgpa}
                onChange={(e) => setEducation({ ...education, cgpa: e.target.value })}
                step="0.01"
                min="0.00" max="10.00"
            />
        </>
    )}
</div>

            </div>
         </div>
    );
}

export default Profile;
