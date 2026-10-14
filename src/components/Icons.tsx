import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const FlowerIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.31 7 20 9.69 20 13C20 16.31 17.31 19 14 19H13V20.27C13.6 20.61 14 21.26 14 22C14 23.1 13.1 24 12 24C10.9 24 10 23.1 10 22C10 21.26 10.4 20.61 11 20.27V19H10C6.69 19 4 16.31 4 13C4 9.69 6.69 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2M12 4C11.45 4 11 4.45 11 5C11 5.55 11.45 6 12 6C12.55 6 13 5.55 13 5C13 4.45 12.55 4 12 4M10 8C7.24 8 5 10.24 5 13C5 15.76 7.24 18 10 18H14C16.76 18 19 15.76 19 13C19 10.24 16.76 8 14 8H10Z"/>
  </svg>
);

export const SunriseIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3,18H6V16H8V14H4V12H8V10H6V8H3V6H8A8,8 0 0,1 16,6H21V8H18V10H22V12H18V14H20V16H22V18H18A8,8 0 0,1 10,18H3V18M12,11A4,4 0 0,1 16,15H8A4,4 0 0,1 12,11M11,2H13V5H11V2M5.64,7.05L7.05,5.64L9.17,7.76L7.76,9.17L5.64,7.05M16.95,7.76L19.07,5.64L20.48,7.05L18.36,9.17L16.95,7.76Z"/>
  </svg>
);

export const TulipIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2L8,6V11C8,13.21 9.79,15 12,15C14.21,15 16,13.21 16,11V6L12,2M10,17V22H14V17H10Z"/>
  </svg>
);

export const SunflowerIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A3,3 0 0,1 15,5A3,3 0 0,1 12,8A3,3 0 0,1 9,5A3,3 0 0,1 12,2M6,6A3,3 0 0,1 9,9A3,3 0 0,1 6,12A3,3 0 0,1 3,9A3,3 0 0,1 6,6M18,6A3,3 0 0,1 21,9A3,3 0 0,1 18,12A3,3 0 0,1 15,9A3,3 0 0,1 18,6M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,16V22H10V16H12Z"/>
  </svg>
);

export const HibiscusIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A4,4 0 0,1 16,6C16,7.45 15.2,8.7 14,9.35V11H15A5,5 0 0,1 20,16H14V14.65C15.2,14 16,12.7 16,11.25A4,4 0 0,0 12,7.25A4,4 0 0,0 8,11.25C8,12.7 8.8,14 10,14.65V16H4A5,5 0 0,1 9,11H10V9.35C8.8,8.7 8,7.45 8,6A4,4 0 0,1 12,2M12,22V16H10V22H12Z"/>
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.45,4L13.5,1L14.55,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95Z"/>
  </svg>
);

export const ClipboardIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7,9H12V11H7V9M14,9H17V11H14V9M7,13H12V15H7V13M14,13H17V15H14V13Z"/>
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
  </svg>
);

export const NoteIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 4.91,19.42 6.13,19.83L5.59,21.46L7.5,21.5L8.54,18.87C9.79,18.5 10.73,17.36 10.73,16A3,3 0 0,0 7.73,14H7M7,16A1,1 0 0,1 6,17A1,1 0 0,1 5,16A1,1 0 0,1 6,15A1,1 0 0,1 7,16Z"/>
  </svg>
);

export const CommentIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10,21.7C9.7,22 9.3,22 9,22V22Z"/>
  </svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z"/>
  </svg>
);

export const WarningIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
  </svg>
);

export const KeyIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7,14A2,2 0 0,1 5,12A2,2 0 0,1 7,10A2,2 0 0,1 9,12A2,2 0 0,1 7,14M12.65,10C11.83,7.67 9.61,6 7,6A6,6 0 0,0 1,12A6,6 0 0,0 7,18C9.61,18 11.83,16.33 12.65,14H17V18H21V14H23V10H12.65Z"/>
  </svg>
);

export const SnowflakeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2L14.39,8.26L21,9.27L16.5,13.97L17.5,21L12,17.77L6.5,21L7.5,13.97L3,9.27L9.61,8.26L12,2M12,5.5L10.5,9.5L6.5,10L9.5,13L8.5,17L12,15L15.5,17L14.5,13L17.5,10L13.5,9.5L12,5.5Z"/>
  </svg>
);

export const MoneyIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5,6H23L19,18H1L5,6M14.5,10A1.5,1.5 0 0,0 13,11.5A1.5,1.5 0 0,0 14.5,13A1.5,1.5 0 0,0 16,11.5A1.5,1.5 0 0,0 14.5,10M10.5,10A1.5,1.5 0 0,0 9,11.5A1.5,1.5 0 0,0 10.5,13A1.5,1.5 0 0,0 12,11.5A1.5,1.5 0 0,0 10.5,10M7,8A1,1 0 0,0 6,9A1,1 0 0,0 7,10A1,1 0 0,0 8,9A1,1 0 0,0 7,8M18,8A1,1 0 0,0 17,9A1,1 0 0,0 18,10A1,1 0 0,0 19,9A1,1 0 0,0 18,8Z"/>
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.25,18H6.75V4H17.25M14,21H10V19H14M17.25,2H6.75C5.78,2 5,2.78 5,3.75V18.25C5,19.22 5.78,20 6.75,20H17.25C18.22,20 19,19.22 19,18.25V3.75C19,2.78 18.22,2 17.25,2M11,4.5H13V6H11V4.5M9.5,16.5A1,1 0 0,0 10.5,15.5A1,1 0 0,0 9.5,14.5A1,1 0 0,0 8.5,15.5A1,1 0 0,0 9.5,16.5M12,14A2.5,2.5 0 0,0 14.5,11.5H15.5A3.5,3.5 0 0,1 12,15A3.5,3.5 0 0,1 8.5,11.5H9.5A2.5,2.5 0 0,0 12,14M14.5,10.5H9.5A1,1 0 0,0 8.5,11.5A1,1 0 0,0 9.5,12.5H14.5A1,1 0 0,0 15.5,11.5A1,1 0 0,0 14.5,10.5Z"/>
  </svg>
);

export const ThermometerIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15,13V5A3,3 0 0,0 12,2A3,3 0 0,0 9,5V13A5,5 0 0,0 12,22A5,5 0 0,0 15,13M12,4A1,1 0 0,1 13,5V12.25L14.25,13.47C14.34,13.56 14.41,13.66 14.45,13.77A3,3 0 0,1 15,15A3,3 0 0,1 12,18A3,3 0 0,1 9,15C9,14.31 9.3,13.67 9.55,13.38C9.59,13.27 9.66,13.17 9.75,13.08L11,12.25V5A1,1 0 0,1 12,4Z"/>
  </svg>
);

export const ScissorsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.64,7.64C9.87,7.14 10,6.59 10,6A4,4 0 0,0 6,2A4,4 0 0,0 2,6A4,4 0 0,0 6,10C6.59,10 7.14,9.87 7.64,9.64L10,12L7.64,14.36C7.14,14.13 6.59,14 6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22A4,4 0 0,0 10,18C10,17.41 9.87,16.86 9.64,16.36L12,14L19,21H22L20,19L22,17H19L12,10L9.64,7.64M6,4C7.1,4 8,4.9 8,6A2,2 0 0,1 6,8A2,2 0 0,1 4,6A2,2 0 0,1 6,4M6,20A2,2 0 0,1 4,18A2,2 0 0,1 6,16A2,2 0 0,1 8,18A2,2 0 0,1 6,20M12,12.5A0.5,0.5 0 0,0 11.5,13A0.5,0.5 0 0,0 12,13.5A0.5,0.5 0 0,0 12.5,13A0.5,0.5 0 0,0 12,12.5M10,6H22V8H10V6Z"/>
  </svg>
);

export const WaterDropIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z"/>
  </svg>
);

export const BanIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12H8A4,4 0 0,1 12,8A4,4 0 0,1 16,12H18A6,6 0 0,0 12,6Z"/>
  </svg>
);

export const SmileIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99,2C6.47,2 2,6.48 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M15,5H16.5V7H15V5M19,9.5C19,12 17,14 14.5,14H9.5C7,14 5,12 5,9.5H19M8,5H9.5V7H8V5Z"/>
  </svg>
);

export const PartyIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2,22L12.5,11.5L16,15L5.5,22.5L2,22M13.5,10.5L17,7L19,9L15.5,12.5L13.5,10.5M18,6L20,4L22,6L20,8L18,6M2,2L6,6L4,8L2,6V2M10,2L14,6L12,8L10,6V2Z"/>
  </svg>
);

export const LanguageIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.87,15.07L10.33,12.56L10.36,12.53L12.87,15.07M17.67,15.07L15.11,12.56L15.14,12.53L17.67,15.07M12.5,6.5L10.5,8.5L12.5,10.5L14.5,8.5L12.5,6.5M11.37,17.32L13.5,19.5L11.37,21.57L9.29,19.5L11.37,17.32M17.42,17.32L19.5,19.5L17.42,21.57L15.34,19.5L17.42,17.32M6,17.14L8.29,19.5L6,21.57L3.71,19.5L6,17.14M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"/>
  </svg>
);

export const CameraIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"/>
  </svg>
);
