import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useField } from "../hooks/useField";
import { updateUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = ({ notify }) => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const user = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [firstName, resetFirstName] = useField("text");
  const [lastName, resetLastName] = useField("text");
  const [file, setFile] = useState(undefined);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setAvatar(downloadUrl);
        });
      }
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      avatar: avatar || user.avatar,
      first_name: firstName.value || user.first_name,
      last_name: lastName.value || user.last_name,
    };
    dispatch(updateUser(user.id, formData));
    notify("Profile Updated !","success");
  };
  return (
    <div className="p-3 max-w-lg mx-auto self-center">
      <h2 className="text-5xl text-center font-semibold text-white">Profile</h2>
      <form className="flex flex-col gap-4 mt-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={avatar || user.avatar}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          className="border p-3 rounded-lg"
          {...firstName}
          placeholder="First Name"
        />
        <input
          className="border p-3 rounded-lg"
          {...lastName}
          placeholder="Second Name"
        />
        <button
          className="ring-2 ring-white bg-blue-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-50"
          onClick={handleSubmit}
        >
          update
        </button>
      </form>
    </div>
  );
};

export default Profile;
