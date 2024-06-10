export default class Activity {
  constructor(
    title,
    instructions,
    duration,
    isGroup,
    mode,
    selectedTypes,
    selectedAlignments,
    selectedMoodle
  ) {
    this.title = title
    this.instructions = instructions
    this.duration = duration
    this.isGroup = isGroup
    this.mode = mode
    this.selectedTypes = selectedTypes
    this.selectedAlignments = selectedAlignments
    this.selectedMoodle = selectedMoodle
  }
}
