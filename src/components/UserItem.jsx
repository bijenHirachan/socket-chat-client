import React from "react";

const UserItem = ({ user }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-500">{user.name}</h2>
      <p className="text-sm text-blue-400">{user.email}</p>
    </div>
  );
};

export default UserItem;
