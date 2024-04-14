import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SearchField() {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="search-field">Search</Label>
      <Input placeholder="Type something..." />
    </div>
  )
}
