import React from 'react';

function ProfilePage({ user }) {
  if (!user) return <h3>Please login first.</h3>;
  // console.log("from profile", user)
  return (
    <div className="profile-container">
      <h2>{user.username}'s Profile</h2>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>

      <h3>Rental History</h3>
      {user.rentals.length === 0 ? (
        <p>No rentals yet.</p>
      ) : (
        <ul>
          {user.rentals.map((r, i) => (
            <li key={i}>
              {r.itemName} — {r.startDate} to {r.endDate} ({r.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfilePage;
