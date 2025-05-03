import React, { useState } from "react";

const EntriesTable = ({ entries, onUpdate, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (entry, index) => {
    setEditIndex(index);
    setEditedData(entry);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = () => {
    onUpdate(editedData, editIndex);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedData({});
  };

  return (
    <div className="entries">
      <h2>Submitted Entries</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Display Name</th>
            <th>Workspace Name</th>
            <th>Workspace URL</th>
            <th>Usage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              {editIndex === index ? (
                <>
                  <td>
                    <input
                      name="fullName"
                      value={editedData.fullName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      name="displayName"
                      value={editedData.displayName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      name="workspaceName"
                      value={editedData.workspaceName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      name="workspaceURL"
                      value={editedData.workspaceURL}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      name="usage"
                      value={editedData.usage}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{entry.fullName}</td>
                  <td>{entry.displayName}</td>
                  <td>{entry.workspaceName}</td>
                  <td>{entry.workspaceURL}</td>
                  <td>{entry.usage}</td>
                  <td>
                    <button onClick={() => handleEditClick(entry, index)}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(index)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntriesTable;
