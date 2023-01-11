import config from 'config'
import { ImagesNamespaceType } from '../data/constants'

const PORT = config.get('port') || 5000

// 10.0.2.2
export const getImageUri = (imageName: ImagesNamespaceType) => `http://10.0.2.2:${PORT}/api/images/${imageName}.png`
