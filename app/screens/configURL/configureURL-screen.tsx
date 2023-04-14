import React, { FC, useState } from "react"
import { ActivityIndicator, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Screen,
  Text,
  TextField,
  AutoImage as Image
} from "../../components"
import { color } from "../../theme"
import { RootNavigatorParamList } from "../../navigators"

import { useStores } from "../../models"
import { showMessage } from "react-native-flash-message"
import * as configureURLScreenStyles from "./configureURL-screen.style";

const { API_URL } = require("../../config/env")
const installationURLImage = require("./installationurl.png")

/**
 * The regular expression regex matches the following pattern:
 *
 *  • `^` matches the beginning of the string.
 * 
 *  • `(https?:\/\/)?` matches the optional "http://" or "https://" protocol.
 * 
 *  • `(` starts a capturing group for the domain name.
 * 
 *  • `(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d{1,5})?` matches "localhost" or an IP address with an optional port number (1-5 digits).
 * 
 *  • `|` separates the alternatives.
 * 
 *  • `(www\.)?[\w-]+\.[a-z]{2,}` matches a domain name with an optional "www." prefix and a top-level domain name with at least two letters.
 * 
 *  • `)` ends the capturing group for the domain name.
 * 
 *  • `(\/\S*)?` matches an optional path after the domain name.
 * 
 *  • `$` matches the end of the string.
 * 
 *  • `i` makes the regular expression case-insensitive.
 * 
 * Example:
 * 
 *    `console.log(isValidUrl("https://www.example.com"));`  // true
 * 
 *    `console.log(isValidUrl("http://localhost:8080"));`    // true
 * 
 *    `console.log(isValidUrl("http://127.0.0.1:3000/"));`   // true
 * @param url 
 * @returns 
 */
function isValidUrl(url: string) {
  // const regex = /^(https?:\/\/)?((localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d{1,5})?|(www\.)?[\w-]+\.[a-z]{2,})(\/\S*)?$/i;
  /**
   * new regex pattern to allow hypens as part of valid url
   */
  // const regex = /^(https?:\/\/)?((localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d{1,5})?|(www\.)?[\w\-]+\.[a-z]{2,})(\/\S*)?$/i
  const regex = /^(https?:\/\/)?((localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d{1,5})?|(www\.)?[\w\-]+\.[a-z]{2,}|([A-Za-z0-9_-]+\.?[A-Za-z0-9_-]*:[0-9]+))(\/\S*)?$/i

  return regex.test(url);
}


export const ConfigureURLScreen: FC<StackScreenProps<RootNavigatorParamList, "configureURL">> = observer(
  ({ navigation }) => {

    const { appConfig } = useStores()
    const [configURL, setConfigURL] = useState<string>(appConfig.configURL)

    // const nextScreen = () => navigation.navigate("demo")

    const handleConnect = async () => {
      isValidUrl(configURL) ?
      await appConfig.checkConnection(configURL, (err) => {
        if (!err) {
          navigation.navigate('login');
          return
        }
        showMessage({
          message: `Host: ${err}`,
          type: "danger"
        })
      }) :
      showMessage({
        message: "Invalid URL: Please provide a valid URL",
        type: "warning"
      })
    }

    return (
      <View testID="ServerSetupScreen" style={configureURLScreenStyles.FULL}>
        <Screen
          style={configureURLScreenStyles.CONTAINER}
          backgroundColor={color.transparent}
          preset="scroll"
        >
          <View style={configureURLScreenStyles.MAINVIEW_CONTAINER}>
            <View style={configureURLScreenStyles.URLLOGOVIEW_CONTAINER}>
              <Image source={installationURLImage} style={configureURLScreenStyles.URLLOGO} />
            </View>
            <View style={configureURLScreenStyles.INFO_TEXT_CONTAINER}>
              <Text style={configureURLScreenStyles.TITLE}>Installation URL</Text>
              <Text style={[configureURLScreenStyles.CONTENT, configureURLScreenStyles.CENTER]}>
                Input server URL of your self-hosted DeCare-HMS installation.
              </Text>
              <TextField
                inputStyle={configureURLScreenStyles.URL_FIELD}
                radius={5}
                value={configURL}
                placeholder={"Eg: " + (API_URL || "http://your-hms-server-url.com")}
                // onChangeText={(text) => appConfig.set("configURL", text)}
                onChangeText={setConfigURL}
                preset="secondary"
                labelStyle={{ color: color.palette.black }}
              />
              <Button
                style={[
                  configureURLScreenStyles.SUBMIT_BUTTON,
                  appConfig.isLoading
                    ? { backgroundColor: color.palette.lightGrey }
                    : { backgroundColor: color.primary },
                ]}
                onPress={handleConnect}
                disabled={appConfig.isLoading}
                type="highlight"
              >
                {appConfig.isLoading ? (
                  <ActivityIndicator
                    animating={appConfig.isLoading}
                    size={"small"}
                    color={color.primary}
                  />
                ) : (
                  <Text style={configureURLScreenStyles.TEXT}>Connect</Text>
                )}
              </Button>
            </View>
          </View>
        </Screen>
      </View>
    )
  },
)