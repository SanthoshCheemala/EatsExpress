import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoaing } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  if (isGetLoaing) {
    return <>Loading...</>;
  }
  if (!currentUser) {
    return <span>Unable to load the user</span>;
  }
  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isUpdateLoading}
      currentUser={currentUser}
    />
  );
};

export default UserProfilePage;
