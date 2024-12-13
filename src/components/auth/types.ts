export interface NeonControlsProps {
  neonIntensity: number;
  setNeonIntensity: (value: number) => void;
  blurRadius: number;
  setBlurRadius: (value: number) => void;
  colorMix: number;
  setColorMix: (value: number) => void;
  pulseSpeed: number;
  setPulseSpeed: (value: number) => void;
  spreadRadius: number;
  setSpreadRadius: (value: number) => void;
  textGlow: number;
  setTextGlow: (value: number) => void;
  borderWidth: number;
  setBorderWidth: (value: number) => void;
  colorSaturation: number;
  setColorSaturation: (value: number) => void;
  colorHue: number;
  setColorHue: (value: number) => void;
  animationPhase: number;
  setAnimationPhase: (value: number) => void;
}