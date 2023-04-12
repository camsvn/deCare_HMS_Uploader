/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { LoaderModal } from "./loader"

declare let module

storiesOf("LoaderModal", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="default">
          <LoaderModal visible={true} loadingText="Fetching Patient"/>
      </UseCase>
    </Story>
  ))