export default class CronFieldDescription {
  public name: string
  public iname: string
  public mandantory: boolean
  public allowedValues: string
  public allowedSpecialCharacters: string
  public examples: string[]
  public onFieldFocusChanged: (idx: number) => void
  public onFieldValueChanged: (idx: number, value: string) => void
  public onFieldBlur: (idx: number, value: string) => void
  public currentCronValue: string
  public idx: number
}
