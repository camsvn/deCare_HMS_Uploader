import { vIcons } from './icons';
import { IconProps } from './icon.props';

/**
 * Is this preset a vector-icon one?
 *
 * @param icon The icon to check
 */
 export function isVectorIcon(icon?: IconProps["icon"]) {
  return Object.keys(vIcons).includes(icon);
}