import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount } from "../features/accounts/accountSlice";
import * as XLSX from "xlsx";

function AccountTable({ onEdit }) {
  // Get accounts from Redux store
  const accounts = useSelector((state) => state.accounts.accounts);

  const dispatch = useDispatch();

  // Local component states
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "asc",
  });

  const recordsPerPage = 10;

  // Step 1: Global search
  const filteredData = accounts.filter((account) =>
    Object.values(account).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase()),
    ),
  );

  // Step 2: Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    const valueA = String(a[sortConfig.key] ?? "").toLowerCase();
    const valueB = String(b[sortConfig.key] ?? "").toLowerCase();

    const comparison = valueA.localeCompare(valueB, undefined, {
      numeric: true,
    });

    return sortConfig.direction === "asc" ? comparison : -comparison;
  });

  // Step 3: Pagination
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;

  const paginatedData = sortedData.slice(
    startIndex,
    startIndex + recordsPerPage,
  );

  useEffect(() => {
    if (currentPage > Math.max(totalPages, 1)) {
      setCurrentPage(Math.max(totalPages, 1));
    }
  }, [currentPage, totalPages]);

  // Step 4: Handle sorting
  const handleSort = (key) => {
    setSortConfig((previous) => ({
      key,
      direction:
        previous.key === key && previous.direction === "asc" ? "desc" : "asc",
    }));

    setCurrentPage(1);
  };

  // Step 5: Download Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Accounts");

    XLSX.writeFile(workbook, "Actify_Accounts.xlsx");
  };

  // Table columns
  const columns = [
    { key: "accountName", label: "Account Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone No." },
    { key: "website", label: "Website" },
    { key: "industry", label: "Industry" },
    { key: "status", label: "Account Status" },
    { key: "remark", label: "Remark" },
  ];

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h3 className="fw-bold mb-1">Account Lists</h3>
          <p className="text-muted mb-0">Here is a list of your accounts.</p>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-success" onClick={downloadExcel}>
            <i className="bi bi-file-earmark-excel me-2"></i>
            Download Excel
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search accounts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover table-striped align-middle mb-0">
          <thead className="table-primary">
            <tr>
              <th>#</th>

              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  {column.label}

                  {sortConfig.key === column.key && (
                    <span className="ms-2">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((account, index) => (
                <tr key={account.id}>
                  <td>{startIndex + index + 1}</td>

                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.key === "status" ? (
                        <span
                          className={`badge ${account.status === "Active" ? "bg-success" : "bg-secondary"}`}
                        >
                          {account.status}
                        </span>
                      ) : (
                        account[column.key]
                      )}
                    </td>
                  ))}

                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onEdit(account)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this account?",
                            )
                          ) {
                            dispatch(deleteAccount(account.id));
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 2} className="text-center py-4">
                  No accounts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-3">
        <p className="mb-0 text-muted">
          Showing {sortedData.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + recordsPerPage, sortedData.length)} of{" "}
          {sortedData.length} entries
        </p>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            Previous
          </button>

          <span className="btn btn-primary btn-sm">
            {currentPage} / {Math.max(totalPages, 1)}
          </span>

          <button
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountTable;
