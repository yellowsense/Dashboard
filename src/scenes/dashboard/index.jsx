import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import '../../styles/dashboard.css';
import RecentBookings from 'components/RecentBookings';
import Bargraph from 'components/Bargraph';
import LineGraph from 'components/LineGraph';

const Dashboard = () => {
  const [serviceProvidersCount, setServiceProvidersCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);

  const [serviceProvidersCounts, setServiceProvidersCounts] = useState({
    CookCount: 0,
    MaidCount: 0,
    NannyCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://backendapiyellowsense.azurewebsites.net/serviceproviders_count'
        );
        const data = await response.json();
        // Assuming the API response has a property 'count' representing the total number of service providers
        setServiceProvidersCount(data.serviceproviders_count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const response = await fetch(
          'https://backendapiyellowsense.azurewebsites.net/bookings_count'
        );
        const data = await response.json();

        // Assuming the API response has a property 'bookings_count'
        setBookingsCount(data.Bookings_count);
      } catch (error) {
        console.error('Error fetching bookings data:', error);
      }
    };

    fetchBookingsData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://backendapiyellowsense.azurewebsites.net/get_all_serviceproviders_counts'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setServiceProvidersCounts(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 60000); // Fetch data every minute (adjust as needed)
    fetchData(); // Initial fetch

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const anglet = (bookingsCount / 1000) * 360;

  const angle = (serviceProvidersCount / 1000) * 360;
  return (
    <div className="container">
      <div className="containerMain">
        <div className="mainContainer">
          <div className="leftContainer">
            <p className="text">{bookingsCount}</p>
            <p className="textTitle">Total Customer Leads</p>
          </div>
          <PieChart
            series={[
              {
                data: [{ id: 0, value: bookingsCount }],
                startAngle: -anglet / 2, // Set the start angle
                endAngle: anglet / 2, // Set the end angle
              },
            ]}
            width={200}
            height={200}
          />
        </div>
        <div className="mainContainer">
          <div className="leftContainer">
            <p className="text">{serviceProvidersCount}</p>
            <p className="textTitle">Number of Service Providers</p>
          </div>
          <PieChart
            series={[
              {
                data: [{ id: 0, value: serviceProvidersCount }],
                startAngle: -angle / 2, // Set the start angle
                endAngle: angle / 2, // Set the end angle
              },
            ]}
            width={400}
            height={200}
          />
        </div>
        <div className="mainContainer">
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: serviceProvidersCounts.MaidCount,
                    label: 'Maid',
                  },
                  {
                    id: 1,
                    value: serviceProvidersCounts.CookCount,
                    label: 'Cook',
                  },
                  {
                    id: 2,
                    value: serviceProvidersCounts.NannyCount,
                    label: 'Nanny',
                  },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>
      <div className="recentMain">
        <h1 className="headingText">Recent Customer Leads</h1>
        <RecentBookings />
      </div>

      <div className="recentMain">
        <div className="barChartContainer">
          <div className="one">
            <h1 className="headingText">Number of Booking Per Day</h1>
            <Bargraph />
          </div>
          <div className="two">
            <h1 className="headingText">Transactions Per Day</h1>
            <LineGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
