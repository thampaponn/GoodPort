import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileView } from "../../components/ProfileView";
import { ProfileStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<ProfileStackParamList, "publicProfile">;

export const PublicProfileScreen = ({ route }: Props) => <ProfileView user={route.params.user} />;
