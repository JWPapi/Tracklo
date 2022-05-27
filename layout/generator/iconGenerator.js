export default function IconGenerator(source) {
    if (source === 'Google') return <i className="ri-google-line text-error"></i>
    if (source === 'an unknown source') return <i className="ri-question-line"></i>
    if (source === 'direct') return <i className="ri-keyboard-line text-warning"></i>
    if (source === 'email') return <i className="ri-mail-line"></i>
    if (source === 'facebook') return <i className="ri-facebook-line text-info"></i>
    return source
}