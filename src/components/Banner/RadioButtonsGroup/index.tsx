import style from './RadioButtonsGroup.module.scss'
export default function RadioButtonsGroup({
  handleCheck,
  isChecked,
}: {
  handleCheck: any
  isChecked: boolean
}) {
  return (
    <div className={style.container}>
      <form>
        <label>
          <input type='radio' name='radio' checked={isChecked || true} />
          <span onClick={() => handleCheck('icons')}>Icons</span>
        </label>
        <label>
          <input type='radio' name='radio' checked={isChecked} />
          <span onClick={() => handleCheck('packs')}>Packs</span>
        </label>
      </form>
    </div>
  )
}
