
import { useState } from "react";

import AccountTable from "../components/AccountTable";
import AccountForm from "../components/AccountForm";

import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaPhone
} from "react-icons/fa";

function Dashboard() {

  const [showForm, setShowForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const openAddForm = () => {
    setSelectedAccount(null);
    setShowForm(true);
  };

  const openEditForm = (account) => {
    setSelectedAccount(account);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedAccount(null);
  };

  return (
    <div className="dashboard-layout">

      <aside className="sidebar">

        <h3 className="brand">
          <span>Actify</span>
          <small>BUSINESS</small>
        </h3>

        <ul className="sidebar-menu">
          <li><FaTachometerAlt /> Dashboard</li>
          <li className="active"><FaUsers /> Accounts</li>
          <li><FaUserTie /> Account Report</li>
          <li><FaPhone /> Contacts</li>
        </ul>

      </aside>

      <main className="main-content">

        <div className="topbar">
          <h5 className="mb-0">Account Management</h5>
          <span className="text-muted">Admin Panel</span>
        </div>

        <div className="container-fluid px-4 pt-4">

          <button
            className="btn btn-primary"
            onClick={openAddForm}
          >
            + Add Account
          </button>

        </div>

        <AccountTable onEdit={openEditForm} />

      </main>

      {showForm && (
        <div className="form-overlay">

          <div className="form-modal">

            <AccountForm
              onClose={closeForm}
              initialData={selectedAccount}
            />

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;
