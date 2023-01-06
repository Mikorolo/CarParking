import { useState, useEffect, useContext } from 'react';
import { View, Text, Image, ImageBackground, Alert, Dimensions } from 'react-native';
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import { HStack, ScrollView, VStack, Center, Flex, Spinner, Toast } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pagination from '../../components/Pagination/Pagination';
import { AuthContext } from '../../context/AuthProvider';
import { ToastAlert } from '../../components/ToastAlert/ToastAlert';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const { userInfo, fetchUserDetails, fetchUserPhoto, image } = useContext(AuthContext);
  const [floor, setFloor] = useState(1);
  const [sector, setSector] = useState("A1");
  const isFocused = useIsFocused();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const indexOfLastRecord = currentPage * limit;
  const indexOfFirstRecord = indexOfLastRecord - limit;
  const nPages = Math.ceil(data.length / limit)
  const total = data.length;
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        setLoading(true)
        let token = await AsyncStorage.getItem('userToken');
        const res = await axios.get('http://192.168.1.49:8080/GetByFloorAndSector',
          {
            params: {
              floor: floor,
              sector: sector
            },
            headers: {
              "Authorization": "Bearer " + token
            }
          });
        setData(res?.data);
        setLoading(false);
      }
      catch {

      }
    }
    fetchParkingSpots();
    fetchUserDetails();
    fetchUserPhoto();
  }, [floor, isFocused, sector, currentPage, fetchUserDetails, fetchUserPhoto])

  const handleReservation = async (spotId) => {
    try {
      let token = await AsyncStorage.getItem('userToken');
      await axios.patch("http://192.168.1.49:8080/MakeReservation", {
        id: spotId
      }, {
        headers: {
          "Authorization": "Bearer " + token
        }
      }
      )
      navigation.navigate("Twoja rezerwacja", {
        params: {
          id: spotId,
        }
      })
    }
    catch {

    }
  }

  const showAlert = (status) => {
    if (status == "RESERVED") {
      Toast.show({
        render: ({
          id
        }) => {
          return <ToastAlert
            id={id}
            title="To miejsce jest zarezerwowane przez innego kierowcę"
            variant="top-accent"
            description=""
            status="warning"
          />;
        }
      })
    }
    else {
      Toast.show({
        render: ({
          id
        }) => {
          return <ToastAlert
            id={id}
            title="To miejsce jest już zajęte"
            variant="top-accent"
            description=""
            status="warning"
          />;
        }
      })
    }
  }
  const handleSpotIconRender = (status, id) => {
    switch (status) {
      case status = "FREE":
        return (
          <TouchableOpacity
            onPress={userInfo?.isReserved === false ?
              () => {
                handleReservation(id)
              } : () => {
                Toast.show({
                  render: ({
                    id
                  }) => {
                    return <ToastAlert
                      id={id}
                      isClosable
                      title="Zarerwowano już inne miejsce. Możesz zarezerwować tylko jedno miejsce na raz"
                      variant="top-accent"
                      description=""
                      status="warning"
                    />;
                  }
                })
              }}>
            <Image
              source={{ uri: "https://icons.iconarchive.com/icons/martz90/hex/512/car-icon.png" }}
              style={{ height: 50, width: 50 }}
            />
          </TouchableOpacity>
        );
      case status = "RESERVED":
        return (
          <TouchableOpacity onPress={userInfo?.spotNumber === id ? () => { navigation.navigate("Twoja rezerwacja", { screen: "Reservation" }) } : () => showAlert(status)}>
            <Image
              source={{ uri: "https://icones.pro/wp-content/uploads/2021/03/icone-de-voiture-symbole-png-orange.png" }}
              style={{ height: 50, width: 50 }}
            />
          </TouchableOpacity>
        );
      case status = "OCCUPIED":
        return (
          <TouchableOpacity onPress={userInfo?.spotNumber === id ? () => { navigation.navigate("Twoja rezerwacja", { screen: "Reservation" }) } : () => showAlert(status)}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/4451/4451008.png" }}
              style={{ height: 50, width: 50 }}
            />
          </TouchableOpacity>
        );
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#262829' }}>
      {loading ?
        <Spinner color="yellow.500" size="lg" /> :
        <ImageBackground
          resizeMode='cover'
          style={{
            flex: 1,
            justifyContent: "center",
            width: Dimensions.get("window").width
          }}
          source={{ uri: "https://mfiles.alphacoders.com/739/739468.jpg" }}
        >
          <ScrollView>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: "white",
              marginTop: 20,
              textAlign: "center",
              textShadowColor: '#171717',
              textShadowOffset: { width: -1, height: 2 },
              textShadowOpacity: 0.5,
              textShadowRadius: 2,
            }}>
              Wybierz miejsce:
            </Text>
            <HStack>
              <Picker
                selectedValue={floor}
                style={{ backgroundColor: "white", marginHorizontal: 20, marginTop: 20, flex: 1 }}
                onValueChange={(itemValue, itemIndex) =>
                  setFloor(itemValue)
                }>
                <Picker.Item label="Piętro 1" value={1} />
                <Picker.Item label="Piętro 2" value={2} />
                <Picker.Item label="Piętro 3" value={3} />
                <Picker.Item label="Piętro 4" value={4} />
              </Picker>
              <Picker
                selectedValue={sector}
                style={{ backgroundColor: "white", marginHorizontal: 20, marginTop: 20, flex: 1 }}
                onValueChange={(itemValue, itemIndex) =>
                  setSector(itemValue)
                }>
                <Picker.Item label="Sektor 1" value="A1" />
                <Picker.Item label="Sektor 2" value="A2" />
                <Picker.Item label="Sektor 3" value="A3" />
                <Picker.Item label="Sektor 4" value="A4" />
              </Picker>
            </HStack>
            <Flex
              flexWrap="wrap"
              direction='row'
              justify='space-evenly'
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30
              }}>
              {data && data.slice(indexOfFirstRecord, indexOfLastRecord).map((key) => (
                <VStack size="sm" key={key.id} style={{ marginHorizontal: 5, marginVertical: 5 }}>
                  <Center>
                    {handleSpotIconRender(key.status, key.id)}
                  </Center>
                  <Center>
                    <Text style={{ color: "white", fontSize: 12, fontFamily: 'Roboto-Medium' }}>
                      Nr: {key.id}
                    </Text>
                  </Center>
                </VStack>
              ))}
            </Flex>
            {total > limit ?
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={total} 
                limit={limit}
              /> : null
            }
          </ScrollView>
        </ImageBackground>}
    </SafeAreaView>
  );
}