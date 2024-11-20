import React, {useState} from "react";
import './styles/UserHome.css'; 
import axios from "axios";
function FormSection(props) {
    const [userEmail, setUserEmail] = useState(props.useremail);
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        date: '',
        area: '',
        location: '',
        description: '',
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleSubmit = async(e) => {
        e.preventDefault();
        setUserEmail(props.useremail);
        
        try {
            const response = await axios.post("http://localhost:3002/addExpense", {formData, userEmail});
            alert(response.data.message);
            setFormData({
                amount: '',
                category: '',
                date: '',
                area: '',
                location: '',
                description: '',
              });
          } 
          catch (error) {
            console.error(error);
            alert("An error occurred while registering. Try again.");
          }
        console.log(userEmail);
      };
  return (
    <div className="expense-form-container">
      <h2>Expense Entry Form</h2>
      <p>Please log your expenses by selecting the relevant area (e.g., West Delhi) and specifying the exact location (e.g., Tilak Nagar) within Delhi NCR. <br /> Ensure accurate details to help track and analyze expenses effectively.</p>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="amount">How Much?</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter the total cost (e.g., ₹500)"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">What's the Spending on?</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">When Did You Spend?</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="area">Select the area within Delhi NCR </label>
          <select
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          >
            <option value="">Select Area</option>
            <option value="East Delhi">East Delhi</option>
            <option value="West Delhi">West Delhi</option>
            <option value="South Delhi">South Delhi</option>
            <option value="North Delhi">North Delhi</option>
            <option value="Noida">Noida</option>
            <option value="Gurugram">Gurugram</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Specify the exact location (e.g., Tilak Nagar)</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description Field */}
        <div className="form-group" id="desc">
          <label htmlFor="description">Details?</label>
          <textarea
            id="description"
            name="description"
            placeholder="Tell us more (e.g., Dinner at ABC Restaurant)"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Submit Expense
        </button>
      </form>
    </div>
  );
}

export default FormSection;
