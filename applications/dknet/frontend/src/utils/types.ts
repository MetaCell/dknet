export interface QuestionOption {
  code: string;
  label: string;
}

export interface QuestionTab {
  code: string;
  question: string;
  questionTitle: string;
  questionSubtitle: string;
  inputType: 'MULTI' | 'SINGLE' | 'BOOLEAN' | 'HIERARCHY';
  options: QuestionOption[];
}

export interface FilterQuestionsProps {
  questionsTabs: QuestionTab[];
  onClickNext: () => void;
  onClickPrev: () => void;
  progress: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  value: number;
  closeDialog: () => void;
  showPreview: boolean;
}

export interface ResponsiveConfig {
  showPreviewByDefault: boolean;
}

export interface ResultItem {
  code: string;
  label: string;
  pctMatch?: number;
}


export type ScreenSize = 'tablet' | 'laptop' | 'smallDesktop' | 'desktop' | 'tooSmall';