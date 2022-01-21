import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProfile } from "../../util/api/profile";
import "./index.css";

import { UserProfile } from "../../types";

type ClickEvent = React.BaseSyntheticEvent;

const Profile = () => {
  const { profile } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!profile) return;
    fetchProfile(profile).then((data) => {
      setLoaded(true);
      setUser(data);
    });
  }, [profile]);

  const [followed, setFollowed] = useState(false);
  const handleClick = (e: ClickEvent) => {
    setFollowed((prev) => !prev);
  };

  if (!loaded) {
    return <div className="profile__container">loading..</div>;
  }
  if (user && user.error) {
    return <div className="profile__container">user not found</div>;
  } else {
    return (
      <div className="profile__container">
        <div className="profile__header">
          <div className="profile__header__photo">
            {user?.picture ? (
              <img
                className="profile__picture"
                src={user.picture}
                alt="user profile"
              />
            ) : (
              <div></div>
            )}
          </div>
          <div className="profile__header__info">
            <div>
              {" "}
              <span>{user?.followedBy.length}</span> followers
            </div>
            <div>
              <span>{user?.following.length}</span> following
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
