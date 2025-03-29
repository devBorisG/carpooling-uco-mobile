import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../utils/constants";
import { getCurrentUser } from "../utils/authService";

const ChatScreen = () => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([
        {
            id: "1",
            text: "Hola, ya estas en camino?",
            sender: "passenger",
            timestamp: "10:30 AM",
        },
        {
            id: "2",
            text: "Sí, estoy a 5 minutos de tu ubicación.",
            sender: "driver",
            timestamp: "10:31 AM",
        },
        {
            id: "3",
            text: "Esta bien, gracias",
            sender: "passenger",
            timestamp: "10:32 AM",
        },
        {
            id: "4",
            text: "No hay de qué.",
            sender: "driver",
            timestamp: "10:34 AM",
        },
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const flatListRef = useRef(null);
    const [userInfo, setUserInfo] = useState(null);

    // Obtener la información del usuario al cargar la pantalla
    React.useEffect(() => {
        const loadUserInfo = async () => {
            const user = await getCurrentUser();
            if (user) {
                setUserInfo(user);
            }
        };
        loadUserInfo();
    }, []);

    const handleSend = () => {
        if (inputMessage.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: inputMessage.trim(),
                sender: userInfo?.role || "passenger",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputMessage("");
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    };

    const renderMessage = ({ item }) => {
        const isDriverMessage = item.sender === "driver";
        return (
            <View style={[styles.messageContainer, isDriverMessage ? styles.driverMessage : styles.passengerMessage]}>
                {!isDriverMessage && (
                    <View style={styles.avatarContainer}>
                        <Image
                            source={userInfo.profileImage}
                            style={styles.avatar}
                        />
                    </View>
                )}
                <View style={[styles.messageBubble, isDriverMessage ? styles.driverBubble : styles.passengerBubble]}>
                    <Text style={[styles.messageText, isDriverMessage ? styles.driverMessageText : styles.passengerMessageText]}>
                        {item.text}
                    </Text>
                    <Text style={[styles.timestamp, isDriverMessage ? styles.driverTimestamp : styles.passengerTimestamp]}>
                        {item.timestamp}
                    </Text>
                </View>
                {isDriverMessage && (
                    <View style={styles.avatarContainer}>
                        <Image
                            source={userInfo.profileImage}
                            style={styles.avatar}
                        />
                    </View>
                )}
            </View>
        );
    };

    if (!userInfo) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.BLACK} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={userInfo.profileImage}
                            style={styles.headerAvatar}
                        />
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerName}>{userInfo.name}</Text>
                        {userInfo.carInfo && (
                            <Text style={styles.carInfo}>
                                {userInfo.carInfo.model} - {userInfo.carInfo.plate}
                            </Text>
                        )}
                        <View style={styles.statusContainer}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>En ruta</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Messages List */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messagesList}
            />

            {/* Input Area */}
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.attachButton}>
                    <Ionicons name="attach" size={24} color={COLORS.GRAY} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={inputMessage}
                    onChangeText={setInputMessage}
                    placeholder="Escribe un mensaje..."
                    placeholderTextColor={COLORS.LIGHT_BLACK}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Ionicons name="send" size={24} color={COLORS.PRIMARY} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: COLORS.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.LIGHT_GRAY,
    },
    backButton: {
        padding: 8,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 12,
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: SIZES.BORDER_RADIUS_LARGE,
    },
    headerInfo: {
        marginLeft: 12,
    },
    headerName: {
        fontSize: SIZES.FONT_MEDIUM,
        fontWeight: "bold",
        color: COLORS.BLACK,
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.SUCCESS,
        marginRight: 4,
    },
    statusText: {
        fontSize: SIZES.FONT_XSMALL,
        color: COLORS.GRAY,
    },
    messagesList: {
        padding: 16,
    },
    messageContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 16,
    },
    driverMessage: {
        justifyContent: "flex-end",
    },
    passengerMessage: {
        justifyContent: "flex-start",
    },
    avatarContainer: {
        marginHorizontal: 8,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    messageBubble: {
        maxWidth: "70%",
        padding: 12,
        borderRadius: 16,
    },
    driverBubble: {
        backgroundColor: COLORS.WHITE,
        borderTopRightRadius: 4,
    },
    passengerBubble: {
        backgroundColor: COLORS.PRIMARY,
        borderTopLeftRadius: 4,
    },
    messageText: {
        fontSize: SIZES.FONT_MEDIUM,
    },
    driverMessageText: {
        color: COLORS.BLACK,
    },
    passengerMessageText: {
        color: COLORS.WHITE,
    },
    timestamp: {
        fontSize: SIZES.FONT_XSMALL,
        marginTop: 4,
    },
    driverTimestamp: {
        color: COLORS.GRAY,
    },
    passengerTimestamp: {
        color: "rgba(255, 255, 255, 0.7)",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: COLORS.WHITE,
        borderTopWidth: 1,
        borderTopColor: COLORS.LIGHT_GRAY,
    },
    attachButton: {
        padding: 8,
    },
    input: {
        flex: 1,
        marginHorizontal: 8,
        padding: 8,
        backgroundColor: COLORS.SOFT_GRAY,
        borderRadius: SIZES.BORDER_RADIUS_LARGE,
        maxHeight: 100,
        color: COLORS.BLACK,
    },
    sendButton: {
        padding: 8,
    },
    carInfo: {
        fontSize: SIZES.FONT_SMALL,
        color: COLORS.GRAY,
        marginTop: 2,
    },
});

export default ChatScreen; 