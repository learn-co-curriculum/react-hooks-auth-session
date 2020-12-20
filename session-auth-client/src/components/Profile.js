import React, { useState } from "react";

function Profile({ onUpdateUser, currentUser }) {
  const [formData, setFormData] = useState({
    image: currentUser.image,
    bio: currentUser.bio,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: make a fetch request to edit the current user
    fetch("http://localhost:3000/profile", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((updatedUser) => {
        // then update that user in state in our App component
        onUpdateUser(updatedUser);
      });
  }

  const { image, bio } = formData;
  const { username } = currentUser;

  return (
    <form onSubmit={handleSubmit}>
      <h1>{username}'s Profile</h1>

      <label>Profile Image</label>
      <input
        type="text"
        name="image"
        autoComplete="off"
        value={image}
        onChange={handleChange}
      />
      <img
        src={
          image.length
            ? image
            : "https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png"
        }
        alt={username}
      />

      <label>Bio</label>
      <textarea name="bio" value={bio} onChange={handleChange} />

      <input type="submit" value="Update" />
    </form>
  );
}

export default Profile;
