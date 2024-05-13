import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import FormLabel from "@mui/material/FormLabel";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import dayjs from 'dayjs';
import axios from 'axios';


const AddServiceprovider = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [timeSlots, setTimeSlots] = useState([]);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      // Make an API request to the backend
      const response = await axios.post('https://backendapiyellowsense.azurewebsites.net/add_service_provider', values);

      // Log the response from the backend
      console.log('API response:', response.data);

      // Show an alert on successful submission
      alert('Data submitted successfully!');

      // Reset the form
      resetForm();

    } catch (error) {
      // Handle errors, log them, or perform any necessary actions
      console.error('Error while making API request:', error);
    }
  };


// Function to add a new time slot
const addTimeSlot = (startTime, endTime) => {
  const newSlot = { startTime, endTime };
  setTimeSlots((prevSlots) => [...prevSlots, newSlot]);
};

// Function to delete a time slot
const deleteTimeSlot = (index) => {
  setTimeSlots((prevSlots) => prevSlots.filter((_, i) => i !== index));
};


  return (
    <Box m="20px">
    <Header title="Create a New Service Provider" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: "span 2" },
              }}
            >
              {/* Left Column */}
              <div className="form-section">
                <label htmlFor="name">Name:</label>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  id="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
              </div>

              <div className="form-section">
                <label htmlFor="age">Age:</label>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  id="age"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.age}
                  name="age"
                  error={!!touched.age && !!errors.age}
                  helperText={touched.age && errors.age}
                  sx={{ gridColumn: "span 2" }}
                />
              </div>

              <div className="form-section">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <TextField
                  fullWidth
                  variant="filled"
                  type="tel"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 4" }}
                />
              </div>

              <div className="form-section">
                <label htmlFor="aadharNumber">Aadhar Number:</label>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.aadharNumber}
                  name="aadharNumber"
                  error={!!touched.aadharNumber && !!errors.aadharNumber}
                  helperText={touched.aadharNumber && errors.aadharNumber}
                  sx={{ gridColumn: "span 4" }}
                />
              </div>

              <div className="form-section search-bar">
                <label htmlFor="apartmentName">Search Apartment:</label>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  id="apartmentName"
                  placeholder="Enter Apartment Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.apartmentName}
                  name="apartmentName"
                  error={!!touched.apartmentName && !!errors.apartmentName}
                  helperText={touched.apartmentName && errors.apartmentName}
                  sx={{ gridColumn: "span 4" }}
                />
              </div>

              <div className="form-section searcharea-bar">
                <label htmlFor="areaName">Search Area:</label>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  id="areaName"
                  placeholder="Enter Area Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.areaName}
                  name="areaName"
                  error={!!touched.areaName && !!errors.areaName}
                  helperText={touched.areaName && errors.areaName}
                  sx={{ gridColumn: "span 4" }}
                />
              </div>
            </Box>

            {/* Right Column */}
            <div className="form-section" style={{ marginTop: "20px" }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender:</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
                
              </FormControl>

              <FormControl component="fieldset" >
                <FormLabel component="legend">Select Services:</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.maid}
                        onChange={handleChange}
                        name="maid"
                      />
                    }
                    label="Maid"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.cook}
                        onChange={handleChange}
                        name="cook"
                      />
                    }
                    label="Cook"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.nanny}
                        onChange={handleChange}
                        name="nanny"
                      />
                    }
                    label="Nanny"
                  />
                </FormGroup>
              </FormControl>
            </div>

              {/* Time Slots */}
        <div className="form-section">
          <label htmlFor="timeSlots">Select Time Slot:</label>
          {timeSlots.map((slot, index) => (
            <div key={index} className="time-slot">
              {dayjs(slot.startTime).format("HH:mm")} - {dayjs(slot.endTime).format("HH:mm")}
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => deleteTimeSlot(index)}
              >
                Delete Slot
              </Button>
            </div>
          ))}
          
          {/* Time Slot Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeClock
              ampm
              onChange={(newValue) => {
                const endTime = newValue.clone().add(1, "hour"); // Assuming slots are 1 hour
                addTimeSlot(newValue, endTime);
              }}
            />
          </LocalizationProvider>
        </div>

       

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Serviceprovider
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  // Add validation schema for the new form fields
  gender: yup.string().required("required"),
  maid: yup.bool().oneOf([true], "Maid service is required"),
  cook: yup.bool().oneOf([true], "Cook service is required"),
  nanny: yup.bool().oneOf([true], "Nanny service is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  aadharNumber: yup.string().required("required"),
  panNumber: yup.string().required("required"),
  // Add validation schema for time slot, apartment name, and area name if needed
  // ...
});

const initialValues = {
  // Add initial values for the new form fields
  gender: "",
  maid: false,
  cook: false,
  nanny: false,
  phoneNumber: "",
  aadharNumber: "",
  panNumber: "",
  name: "", // Initialize name with an empty string
  age: "", // Initialize age with an empty string or a default value
  apartmentName: "", // Initialize apartmentName with an empty string
  areaName: "", // Initialize areaName with an empty string
  startTime: null, // Initialize startTime with null or a default value
  endTime: null, // Initialize endTime with null or a default value
  // Add initial values for time slot, apartment name, and area name if needed
  // ...
};

export default AddServiceprovider;
