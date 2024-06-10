import Activity from '@/classes/Activity.js'

export default class Week {
  constructor(name, date, description, activities) {
    this.name = name
    this.date = date
    this.description = description
    this.activities = activities
  }
}
