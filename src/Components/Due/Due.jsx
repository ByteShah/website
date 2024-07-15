import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      const token = localStorage.getItem("access_token");
      const uid = localStorage.getItem("uid");
      try {
        const response = await axios.get(
          "http://192.168.1.217:8000/api/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              uid: uid,
            },
          }
        );
        debugger;
        setHistoryData(response.data.data);
      } catch (error) {
        console.error("Error fetching history data", error);
      }
    };

    fetchHistoryData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Borrowed Books History</h1>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Book Name</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((record) => (
                <tr key={record.id}>
                  <td>{record.book_data.title}</td>
                  <td>{record.end_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
