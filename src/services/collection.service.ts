import ApiService from "@/utils/api-service";

class CollectionService {
  getAll(next: string = "") {
    return ApiService.get(
      `/v2/collections?chain_identifier=ethereum&include_hidden=false&next=${next}`
    );
  }

  findOne(slug: string) {
    return ApiService.get(`/v2/collections/${slug}`);
  }
}

export default new CollectionService();
