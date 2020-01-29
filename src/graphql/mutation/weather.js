import { gql } from 'apollo-boost';

const FAVOURITE_MUTATION = gql`
  mutation favouriteFlag($nid: Int, $flag: String, $status: Int) {
    data: getFavouriteResponse(nid: $nid, flag: $flag, status: $status) {
      nid
      favourites
      status
      bookmarkStatus
      message
    }
  }
`;

export default FAVOURITE_MUTATION;
