import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { Divider } from "./modal"
import {View, Text} from 'react-native'

declare let module

storiesOf("Divider", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="default" usage="Horizontal">
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text>Content on the top</Text>
          </View>
          <Divider color="#CCC" thickness={2} orientation="horizontal" />
          <View style={{ flex: 1 }}>
            <Text>Content on the bottom</Text>
          </View>
        </View>
      </UseCase>
    </Story>
  ))
