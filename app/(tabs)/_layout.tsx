import React from "react"
import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#00a7ff',
                headerShown: false,
                tabBarInactiveTintColor: '#808080'
            }}
        >
            <Tabs.Screen
                name={'index'}
                options={{
                    title: 'Погода',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='cloudy' size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name={'forecast'}
                options={{
                    title: 'Прогноз',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='calendar' size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name={'profile'}
                options={{
                    title: 'Профіль',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='person' size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    );
}